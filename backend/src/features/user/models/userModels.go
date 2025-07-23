package models

import (
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/models"
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Name 	string `json:"name" binding:"required"`
	Email	string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" binding:"required"`

	Transaction []models.Transaction `gorm:"foreignKey:UserID;"`
}