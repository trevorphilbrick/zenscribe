package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

// user struct
type User struct {
	User_uuid  string    `json:"user_uuid" binding:"required"`
	Email      string    `json:"email" binding:"required"`
	Name       string    `json:"name" binding:"required"`
	Created_at time.Time `json:"created_at" binding:"required"`
}

// journal entries struct
type JournalEntry struct {
	Entry_id      int    `json:"entry_id" binding:"required"`
	Session_id    int    `json:"session_id" binding:"required"`
	User_uuid     string `json:"user_uuid" binding:"required"`
	Journal_entry string `json:"journal_entry" binding:"required"`
}

// sessions struct
type Session struct {
	Session_id int       `json:"session_id" binding:"required"`
	User_uuid  string    `json:"user_uuid" binding:"required"`
	Date       string    `json:"date" binding:"required"`
	Timestamp  time.Time `json:"timestamp" binding:"required"`
	Duration   int       `json:"duration" binding:"required"`
	Activity   string    `json:"activity" binding:"required"`
}

// dates struct
type Date struct {
	Date      string `json:"date" binding:"required"`
	User_uuid string `json:"user_uuid" binding:"required"`
	Marked    bool   `json:"marked" binding:"required"`
}

func createUser(c *gin.Context) {
	var user User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// insert user into users table

	// handle possible errors from user table

	c.IndentedJSON(http.StatusAccepted, gin.H{
		"message": "User successfully created",
		"user":    user,
	})

}

func getUser(c *gin.Context) {
	// get id from request
	userUUID := c.Query("user_uuid")
	// if no request, return error
	if userUUID == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "user_uuid is required"})
		return
	}

	// get user from users table
	// fake user for testing
	user := User{
		User_uuid:  "1",
		Email:      "trevor@test.com",
		Name:       "trevor philbrick",
		Created_at: time.Now(),
	}

	// handle possible errors from user table

	c.IndentedJSON(http.StatusOK, user)
}

// get journal entries

func getJournalEntries(c *gin.Context) {
	// get id from request
	userUUID := c.Query("user_uuid")
	// if no request, return error
	if userUUID == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "user_uuid is required"})
		return
	}

	// get user from users table
	// fake user for testing
	journalEntries := []JournalEntry{
		{
			Entry_id:      1,
			Session_id:    101,
			User_uuid:     "uuid-123",
			Journal_entry: "Today was a good day. I felt more focused during yoga.",
		},
		{
			Entry_id:      2,
			Session_id:    102,
			User_uuid:     "uuid-123",
			Journal_entry: "Meditation helped me clear my mind and feel relaxed.",
		},
		{
			Entry_id:      3,
			Session_id:    103,
			User_uuid:     "uuid-456",
			Journal_entry: "Workout session was intense but fulfilling.",
		},
	}

	// handle possible errors from user table

	c.IndentedJSON(http.StatusOK, journalEntries)
}

// get sessions

func getSessions(c *gin.Context) {
	// get id from request
	userUUID := c.Query("user_uuid")
	// if no request, return error
	if userUUID == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "user_uuid is required"})
		return
	}

	// get user from users table
	// fake user for testing

	sessions := []Session{
		{
			Session_id: 1,
			User_uuid:  "uuid-123",
			Date:       "2024-11-20",
			Timestamp:  time.Now(),
			Duration:   60,
			Activity:   "Yoga",
		},
		{
			Session_id: 2,
			User_uuid:  "uuid-456",
			Date:       "2024-11-21",
			Timestamp:  time.Now(),
			Duration:   30,
			Activity:   "Meditation",
		},
		{
			Session_id: 3,
			User_uuid:  "uuid-789",
			Date:       "2024-11-22",
			Timestamp:  time.Now(),
			Duration:   45,
			Activity:   "Workout",
		},
	}

	// handle possible errors from user table

	c.IndentedJSON(http.StatusOK, sessions)
}

// get dates

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))

	router.POST("/user", createUser)
	router.GET("/user", getUser)
	router.GET("/sessions", getSessions)
	router.GET("/journalEntries", getJournalEntries)

	router.Run()
}
