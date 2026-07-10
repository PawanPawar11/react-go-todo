package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Todo struct {
	ID        bson.ObjectID `bson:"_id,omitempty" json:"id"`
	Body      string        `bson:"body" json:"body"`
	Completed bool          `bson:"completed" json:"completed"`
}

var DB *mongo.Database

func main() {
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			log.Fatal("Error while loading .env file:", err.Error())
		}
	}

	uri := os.Getenv("MONGO_URI")

	if uri == "" {
		log.Fatal("Failed to load MONGO_URI from .env file")
	}

	err := Connect(&uri)
	fmt.Println(err)

	app := fiber.New()

	app.Get("/api/todos", getTodos)

	app.Listen("127.0.0.1:8080")
}

func Connect(uri *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(options.Client().ApplyURI(*uri))
	if err != nil {
		return err
	}

	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	DB = client.Database("react-go-todo_db")

	return nil
}

func getTodos(c *fiber.Ctx) error {
	collection := DB.Collection("todos")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)
	if err != nil {
		return err
	}

	var todos []Todo

	err = cursor.All(context.Background(), &todos)
	if err != nil {
		return err
	}

	return c.JSON(todos)
}
