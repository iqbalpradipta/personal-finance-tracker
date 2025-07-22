package main

import (
	"log"
	"net/http"

	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/config"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/migration"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/routes"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error when load .env")
	}

	db := config.ConfigInit()

	if err := migration.AutoMigrate(db); err != nil {
		panic(err)
	}

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))

	routes.Routes(e, db)

	e.Logger.Fatal(e.Start(":8000"))
}