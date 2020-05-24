package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/sherman-grewal/shophub-backend/cart"
	"github.com/sherman-grewal/shophub-backend/common"
	"github.com/sherman-grewal/shophub-backend/users"

	"github.com/gin-contrib/cors"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
}

func main() {

	db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()

	r.Use(cors.Default())

	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	cart.CheckoutCart(v1.Group("/cart"))

	// Run the server
	r.Run()
}
