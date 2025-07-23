package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/models"
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/services"
	"github.com/labstack/echo/v4"
)

type TransactionControllers struct {
	services.TransactionService
}

func NewTransactionControllers(t services.TransactionService) *TransactionControllers {
	return &TransactionControllers{t}
}

type summary struct {
	Income		int `json:"income"`
	Expenses 	int `json:"expenses"`
	Balance 	int `json:"balance"`
}


func(t *TransactionControllers) GetTransactionFilter(c echo.Context) error {
	filterType := c.QueryParam("type")
	startDate := c.QueryParam("start")
	endDate := c.QueryParam("end")

	if filterType != "" && filterType != "Income" && filterType != "Expenses" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"status":   "Failed",
			"messages": "Invalid 'type' parameter. Must be 'Income' or 'Expenses'.",
		})
	}

	if startDate != "" {
		_, err := time.Parse("2006-01-02", startDate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"status":   "Failed",
				"messages": "Invalid 'start' date format. Use YYYY-MM-DD.",
			})
		}
	}

	if endDate != "" {
		_, err := time.Parse("2006-01-02", endDate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"status":   "Failed",
				"messages": "Invalid 'end' date format. Use YYYY-MM-DD.",
			})
		}
	}

	userId := c.Get("user_id").(uint)
	data, err := t.TransactionService.GetTransactionFilter(filterType, startDate, endDate, userId); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to get Transaction !",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success get all transaction.",
		"data": data,
	})
}

func(t *TransactionControllers) GetTransaction(c echo.Context) error {
	userId := c.Get("user_id").(uint)
	data, err := t.TransactionService.GetTransaction(userId); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to get Transaction !",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success get all transaction.",
		"data": data,
	})
}

func(t *TransactionControllers) GetTransactionById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	data, err := t.TransactionService.GetTransactionById(uint(id)); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed to get data by ID",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success get all transaction.",
		"data": data,
	})
}

func(t *TransactionControllers) CreateTransaction(c echo.Context) error {
	var data models.Transaction
	err := c.Bind(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed Bind Data !",
		}) 
	}

	data.UserID = c.Get("user_id").(uint)
	err = t.TransactionService.CreateTransaction(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed create transaction !",
		}) 
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success create transaction.",
		"data": data,
	})
}

func(t *TransactionControllers) UpdateTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	data, err := t.TransactionService.GetTransactionById(uint(id)); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed Find transaction data !",
		}) 
	}

	err = c.Bind(&data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed bind data !",
		}) 
	}

	err = t.TransactionService.UpdateTransaction(uint(id), &data); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed Update transaction !",
		}) 
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success update transaction.",
		"data": data,
	})
}

func(t *TransactionControllers) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	err := t.TransactionService.DeleteTransaction(uint(id)); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed delete transaction !",
		}) 
	}

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success Delete transaction.",
	})
}

func(t *TransactionControllers) SummaryTransaction(c echo.Context) error {
	userId := c.Get("user_id").(uint)
	data, err := t.TransactionService.GetTransaction(userId); if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status": "Failed",
			"messages": "Failed Get transaction !",
		})
	}

	var mySummary summary
	mySummary.Income = 0
	mySummary.Expenses = 0
	

	for _, allTransaction := range data {
		if allTransaction.Type == "Income" {
			mySummary.Income += int(allTransaction.Amount)
		} else if allTransaction.Type == "Expenses" {
			mySummary.Expenses += int(allTransaction.Amount)
		}
	}

	mySummary.Balance = mySummary.Income - mySummary.Expenses

	return c.JSON(http.StatusOK, echo.Map{
		"status": "Success",
		"messages": "Success Create Summary.",
		"data": mySummary,
	})

}