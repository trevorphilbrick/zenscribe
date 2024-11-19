package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

type User struct {
	User_uuid  string    `json:"user_uuid" binding:"required"`
	Email      string    `json:"email" binding:"required"`
	Name       string    `json:"name" binding:"required"`
	Created_at time.Time `json:"created_at" binding:"required"`
}

// journal entries struct

// sessions struct

// dates struct

func testAPI(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "backend successfully reached"})
}

func createUser(c *gin.Context) {
	var user User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// insert user into users table

	// handle possible errors from user table

	c.IndentedJSON(http.StatusOK, gin.H{
		"message": "User successfully created",
		"user":    user,
	})

}

// get journal entries

// get sessions

// get dates

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))

	router.POST("/user", createUser)
	router.GET("/", testAPI)

	router.Run()
}
