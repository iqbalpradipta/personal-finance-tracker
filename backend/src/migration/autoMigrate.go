package migration

import (
	transaction "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/transaction/models"
	user "github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/models"
	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&user.Users{},
		&transaction.Transaction{},
	)
}