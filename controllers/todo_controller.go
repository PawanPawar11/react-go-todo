package controllers

import (
	"context"

	"github.com/PawanPawar11/react-go-todo/config"
	"github.com/PawanPawar11/react-go-todo/models"
	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/v2/bson"
)

func GetTodos(c *fiber.Ctx) error {
	collection := config.DB.Collection("todos")

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	var todos []models.Todo

	if err := cursor.All(context.Background(), &todos); err != nil {
		return err
	}

	return c.JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	collection := config.DB.Collection("todos")

	var todo models.Todo

	if err := c.BodyParser(&todo); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	result, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = result.InsertedID.(bson.ObjectID)

	return c.Status(fiber.StatusCreated).JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	collection := config.DB.Collection("todos")

	id := c.Params("id")

	objectID, err := bson.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	filter := bson.M{"_id": objectID}

	update := bson.M{"$set": bson.M{"completed": true}}

	result, err := collection.UpdateOne(
		context.Background(),
		filter,
		update,
	)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(result)
}

func DeleteTodo(c *fiber.Ctx) error {
	collection := config.DB.Collection("todos")

	id := c.Params("id")

	objectID, err := bson.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": "Record deleted successfully"})
}
