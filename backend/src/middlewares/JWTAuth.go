package middlewares

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

func Authentication(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeaders := c.Request().Header.Get("Authorization")
		if authHeaders == "" {
			return c.JSON(http.StatusUnauthorized, echo.Map{"Message": "Authorization header required"})
		}

		tokenString := strings.TrimSpace(strings.TrimPrefix(authHeaders, "Bearer"))
		if tokenString == authHeaders {
			return c.JSON(http.StatusUnauthorized, echo.Map{"Message": "Invalid authorization format"})
		}

		claims, err := VerifyToken(tokenString)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{"Message": "Invalid or expired token"}) 
		}

		idConv, _ := strconv.Atoi(claims.ID)

		c.Set("user_id", uint(idConv))
		c.Set("user_email", claims.Email)

		return next(c)
	}
}