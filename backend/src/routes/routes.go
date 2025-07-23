package routes

import (
	transactionControllers "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/controllers"
	transactionServices "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/services"
	userControllers "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/controllers"
	userServices "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/services"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Routes(e *echo.Echo, db *gorm.DB) {
	api := e.Group("/api")

	userService := userServices.NewUserServices(db)
	userControllers := userControllers.NewUserServices(userService)
	UserRoutes(api, userControllers)

	transactionService := transactionServices.NewTransactionService(db)
	transactionControllers := transactionControllers.NewTransactionControllers(transactionService)
	TransactionRoutes(api, transactionControllers)
}