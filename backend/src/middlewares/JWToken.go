package middlewares

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func SecretKey() []byte {
	var secretKey = []byte(os.Getenv("SECRET_KEY"))

	return secretKey
}

type UserData struct {
	ID 		string
	Name 	string
	Email 	string
	jwt.RegisteredClaims
}

func CreateToken(id, name, email string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, UserData{
		ID: id,
		Name: name,
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	})

	tokenString, err := claims.SignedString(SecretKey()); if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (*UserData, error) {
	token, err := jwt.ParseWithClaims(tokenString, &UserData{}, func(t *jwt.Token) (interface{}, error) {
		return SecretKey(), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*UserData); ok && token.Valid{
		return claims, nil
	}

	return nil, jwt.ErrInvalidKey
}