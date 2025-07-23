package routes

import (
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/controllers"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/middlewares"
	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group, c *controllers.TransactionControllers) {
	e.GET("/transactions", c.GetTransaction, middlewares.Authentication)
	e.GET("/transaction", c.GetTransactionFilter, middlewares.Authentication)
	e.GET("/transaction/:id", c.GetTransactionById, middlewares.Authentication)
	e.POST("/transaction", c.CreateTransaction, middlewares.Authentication)
	e.PUT("/transaction/:id", c.UpdateTransaction , middlewares.Authentication)
	e.DELETE("/transaction/:id", c.DeleteTransaction , middlewares.Authentication)
	e.GET("/summary", c.SummaryTransaction, middlewares.Authentication)
}