package models

import (
	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	Type	string `json:"type"`
	Amount	float64 `json:"amount"`
	Category string `json:"category"`
	Description string `json:"description"`
	UserID	uint `json:"userId"`
}