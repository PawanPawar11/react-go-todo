package main

import (
	"log"
	"os"

	"github.com/PawanPawar11/react-go-todo/config"
	"github.com/PawanPawar11/react-go-todo/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {

	if os.Getenv("ENV") != "production" {
		// godotenv.Load() without any parameters automatically looks for a file named exactly .env in your current working directory
		godotenv.Load()
	}

	if err := config.Connect(os.Getenv("MONGO_URI")); err != nil {
		log.Fatal(err)
	}

	app := fiber.New()

	app.Use(cors.New())

	routes.SetupTodoRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
