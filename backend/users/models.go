package users

import (
	"errors"

	"github.com/jinzhu/gorm"

	"github.com/sherman-grewal/shophub-backend/common"
	"golang.org/x/crypto/bcrypt"
)

type PaymentCardModel struct {
	gorm.Model
	CardNumber   string
	ExpiryDate   string
	SecurityCode string
	UserID       uint
}

type UserModel struct {
	gorm.Model
	ID               uint   `gorm:"primary_key"`
	FirstName        string `gorm:"column:firstName"`
	LastName         string `gorm:"column:lastName"`
	Email            string `gorm:"column:email;unique_index"`
	PasswordHash     string `gorm:"column:password;not null"`
	PaymentCardModel PaymentCardModel
}

// Migrate the schema of database if needed
func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&UserModel{})
}

// 	err := userModel.setPassword("password0")
func (u *UserModel) setPassword(password string) error {
	if len(password) == 0 {
		return errors.New("password should not be empty")
	}
	bytePassword := []byte(password)
	// Make sure the second param `bcrypt generator cost` between [4, 32)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.PasswordHash = string(passwordHash)
	return nil
}

func (u *UserModel) setPaymentCard(paymentCard PaymentCardModel) error {
	// TODO: Payment Card Validations
	u.PaymentCardModel = paymentCard
	return nil
}

// 	if err := serModel.checkPassword("password0"); err != nil { password error }
func (u *UserModel) checkPassword(password string) error {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(u.PasswordHash)
	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
}

// 	userModel, err := FindOneUser(&UserModel)
func FindOneUser(condition interface{}) (UserModel, error) {
	db := common.GetDB()
	var model UserModel
	err := db.Where(condition).First(&model).Error
	return model, err
}

// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

//  err := db.Model(userModel).Update(UserModel).Error
func (model *UserModel) Update(data interface{}) error {
	db := common.GetDB()
	err := db.Model(model).Update(data).Error
	return err
}
