package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/models"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/services"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/middlewares"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

type UserControllers struct {
	services.UserService
}

func NewUserServices(u services.UserService) *UserControllers  {
	return &UserControllers{u}
}

func (u *UserControllers) Register(c echo.Context) error  {
	var data models.Users

	err := c.Bind(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to bind data",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data.Password), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed when hashing data",
		})
	}

	data.Password = string(hashedPassword)

	err = u.UserService.Register(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to register user !",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Register Success !",
		"data": data,
	})
}

func(u *UserControllers) Login(c echo.Context) error {
	var data models.Users

	err := c.Bind(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to bind data",
		})
	}

	find, err := u.UserService.GetUserByEmail(data.Email); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": fmt.Sprintf("Failed to get user %v", data.Email),
		})
	}

	token, err := middlewares.CreateToken(strconv.Itoa(int(find.ID)), find.Name ,find.Email); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to create token",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(find.Password), []byte(data.Password))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Password is wrong!",
		})
	} else {
		_, err := u.UserService.Login(&data); if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"status": "Failed",
				"messages": "Login Failed !",
			})
		}

		return c.JSON(http.StatusOK, echo.Map{
			"status": "Success",
			"messages": "Login Success !",
			"data": token,
		})
	}
}

func(u *UserControllers) GetUserByEmail(c echo.Context) error  {
	email := c.Param("email")
	data, err := u.UserService.GetUserByEmail(email); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": fmt.Sprintf("Failed to get user %v", email),
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Login Success !",
		"data": data,
	})
}