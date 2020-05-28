package users

import (
	"github.com/gin-gonic/gin"

	"github.com/sherman-grewal/shophub-backend/common"
)

type ProfileSerializer struct {
	C *gin.Context
	UserModel
}

// Declare your response schema here
type ProfileResponse struct {
	ID        uint    `json:"-"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Image     *string `json:"image"`
}

// Put your response logic including wrap the userModel here.
func (self *ProfileSerializer) Response() ProfileResponse {
	profile := ProfileResponse{
		ID:        self.ID,
		FirstName: self.FirstName,
		LastName:  self.LastName,
	}
	return profile
}

type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Token     string `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	myUserModel := self.c.MustGet("my_user_model").(UserModel)
	user := UserResponse{
		FirstName: myUserModel.FirstName,
		LastName:  myUserModel.LastName,
		Email:     myUserModel.Email,
		Token:     common.GenToken(myUserModel.ID),
	}
	return user
}

type PaymentCardSerializer struct {
	c *gin.Context
}

type PaymentCardResponse struct {
	CardNumber   string
	ExpiryDate   string
	SecurityCode string
}

func (self *PaymentCardSerializer) Response() PaymentCardResponse {
	myPaymentCardModel := self.c.MustGet("my_payment_card_model").(PaymentCardModel)
	paymentCard := PaymentCardResponse{
		CardNumber:   myPaymentCardModel.CardNumber,
		ExpiryDate:   myPaymentCardModel.ExpiryDate,
		SecurityCode: myPaymentCardModel.SecurityCode,
	}
	return paymentCard
}
