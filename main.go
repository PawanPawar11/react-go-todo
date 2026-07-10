package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id"`
	Body      string `json:"body"`
	Completed bool   `json:"completed"`
}

func main() {
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			log.Fatal("Error while loading .env file:", err.Error())
		}
	}

	// Sample Block
	/*
		todos := []Todo{
			{ID: 1, Body: "Sunday", Completed: true},
			{ID: 2, Body: "Monday", Completed: false},
			{ID: 3, Body: "Tuesday", Completed: true},
		}
	*/

	todos := []Todo{}

	app := fiber.New()

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	app.Listen("127.0.0.1:8080")
}
