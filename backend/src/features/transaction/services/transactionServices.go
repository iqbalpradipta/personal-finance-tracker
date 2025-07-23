package services

import (
	"time"

	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/models"
	"gorm.io/gorm"
)

type TransactionService interface {
	GetTransaction(userId uint) ([]models.Transaction, error)
	GetTransactionFilter(filterType, startDate, endDate string, userId uint) ([]models.Transaction, error)
	GetTransactionById(id uint) (models.Transaction, error)
	CreateTransaction(data *models.Transaction) error
	UpdateTransaction(id uint, data *models.Transaction) error
	DeleteTransaction(id uint) error
	SummaryTransaction() ([]models.Transaction, error)
}

type transactionRepo struct {
	db *gorm.DB
}


func NewTransactionService(db *gorm.DB) TransactionService {
	return &transactionRepo{db}
}

func (t *transactionRepo) SummaryTransaction() ([]models.Transaction, error) {
	var data []models.Transaction
	err := t.db.Find(&data).Error
	return data, err
}

func (t *transactionRepo) GetTransaction(userId uint) ([]models.Transaction, error) {
	var data []models.Transaction

	err := t.db.Where("user_id = ?", userId).Find(&data).Error
	return data, err
}

func (t *transactionRepo) GetTransactionFilter(filterType, startDate, endDate string, userId uint) ([]models.Transaction, error) {
	var data []models.Transaction
	query := t.db.Model(&models.Transaction{})

	if filterType != "" {
		query = query.Where("type = ?", filterType)
	}

	if startDate != "" {
		parsedStartDate, err := time.Parse("2006-01-02", startDate)
		if err != nil {
			return nil, err
		}
		query = query.Where("date >= ?", parsedStartDate)
	}

	if endDate != "" {
		parsedEndDate, err := time.Parse("2006-01-02", endDate)
		if err != nil {
			return nil, err
		}

		query = query.Where("date <= ?", parsedEndDate.Add(24*time.Hour).Add(-time.Second)) // untuk mencakup hingga akhir hari
	}

	query = query.Where("deleted_at IS NULL")

	err := query.Where("user_id = ?", userId).Find(&data).Error
	return data, err
}

func (t *transactionRepo) GetTransactionById(id uint) (models.Transaction, error) {
	var data models.Transaction

	err := t.db.First(&data, id).Error
	return data, err
}

func (t *transactionRepo) CreateTransaction(data *models.Transaction) error {
	return t.db.Create(&data).Error
}

func (t *transactionRepo) UpdateTransaction(id uint, data *models.Transaction) error {
	var transaction models.Transaction

	err := t.db.First(&transaction, id).Error
	if err != nil {
		return err
	}

	if data.Type != "" {
		transaction.Type = data.Type
	}

	if data.Amount != 0 {
		transaction.Amount = data.Amount
	}

	if data.Category != "" {
		transaction.Category = data.Category
	}

	if data.Description != "" {
		transaction.Description = data.Description
	}

	return t.db.Save(&data).Error
}

func (t *transactionRepo) DeleteTransaction(id uint) error {
	return t.db.Unscoped().Delete(&models.Transaction{}, id).Error
}
