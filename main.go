package main

import (
	"fmt"
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

	// Get All Todos
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	// Create a Todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo body is a required field"})
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.Status(201).JSON(todos)
	})

	// Update a Todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for idx, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[idx].Completed = true

				return c.Status(200).JSON(todos[idx])
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Specified todo resource not found"})
	})

	app.Listen("127.0.0.1:8080")
}
