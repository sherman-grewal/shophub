package cart

type PaymentModel struct {
	ChargeID string `gorm:"primary_key"`
	Amount   int    `gorm:"column:amount; not null"`
	Captured bool   `gorm:"column:captured"`
	Currency string `gorm:"column:currency"`
}
