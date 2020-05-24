package cart

import (
	"github.com/stripe/stripe-go"
)

type PaymentSerializer struct {
	C *stripe.Charge
	PaymentModel
}

type PaymentResponse struct {
	ChargeID string //`json:"charge_id"`
	Amount   int    //`json:"amount"`
	Captured bool   //`json:"captured"`
	Currency string //`json:"currency"`
}

// Put your response logic including wrap the userModel here.
func (self *PaymentSerializer) Response() PaymentResponse {
	payment := PaymentResponse{
		ChargeID: self.ChargeID,
		Amount:   self.Amount,
		Currency: self.Currency,
		Captured: self.Captured,
	}
	return payment
}
