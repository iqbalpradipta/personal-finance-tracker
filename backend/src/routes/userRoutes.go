package routes

import (
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/controllers"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/middlewares"
	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group, c *controllers.UserControllers) {
	e.POST("/register", c.Register)
	e.POST("/login", c.Login)
	e.GET("/user/:email", c.GetUserByEmail, middlewares.Authentication)
}