package services

import (
	"github.com/iqbalpradipta/personal-finance-tracker/tree/main/src/features/user/models"
	"gorm.io/gorm"
)

type UserService interface {
	GetUser() ([]models.Users, error)
	GetUserByEmail(email string) (models.Users, error)
	Register(data *models.Users) error
	Login(data *models.Users) (string, error)
}

type userRepo struct {
	db *gorm.DB
}

func (u *userRepo) GetUser() ([]models.Users, error) {
	var user []models.Users
	return user, u.db.Find(&user).Error
}

func (u *userRepo) GetUserByEmail(email string) (models.Users, error) {
	var user models.Users
	err := u.db.First(&user, "email = ?", email).Error
	return user, err
}

func (u *userRepo) Login(data *models.Users) (string, error) {
	return "", u.db.Where("email = ?", data.Email).First(&data).Error
}

func (u *userRepo) Register(data *models.Users) error {
	return u.db.Create(&data).Error
}

func NewUserServices(db *gorm.DB) UserService {
	return &userRepo{db}
}
