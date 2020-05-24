package cart

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
)

func CheckoutCart(router *gin.RouterGroup) {
	router.POST("/checkout", ProcessPayment)
}

func ProcessPayment(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	//paymentModelValidator := NewPaymentModelSerializer()
	stripe.Key = "sk_test_hUuV9rZaaGFIp9d7zPC9V4ly003GRJbIKf"

	// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
	params := &stripe.ChargeParams{
		Amount:      stripe.Int64(2000),
		Currency:    stripe.String(string(stripe.CurrencyCAD)),
		Description: stripe.String("My First Test Charge"),
		Source:      &stripe.SourceParams{Token: stripe.String("tok_visa")},
	}
	cartCharge, _ := charge.New(params)
	// c.Set("my_payment_model", paymentModelValidator.paymentModel)
	// serializer := PaymentSerializer{cartCharge}
	c.JSON(http.StatusCreated, gin.H{"payment": cartCharge})
}
