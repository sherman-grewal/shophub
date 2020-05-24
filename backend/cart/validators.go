package cart

// *ModelValidator containing two parts:
// - Validator: write the form/json checking rule according to the doc https://github.com/go-playground/validator
// - DataModel: fill with data from Validator after invoking common.Bind(c, self)
// Then, you can just call model.save() after the data is ready in DataModel.
type PaymentModelValidator struct {
	Payment struct {
		ChargeID string `form:"charge_id" json:"charge_id"`
		Amount   int    `form:"amount" json:"amount"`
		Captured bool   `form:"captured" json:"captured"`
		Currency string `form:"currency" json:"currency"`
	} `json:"user"`
	paymentModel PaymentModel `json:"-"`
}

func NewPaymentModelSerializer() PaymentModelValidator {
	paymentModelValidator := PaymentModelValidator{}
	return paymentModelValidator
}
