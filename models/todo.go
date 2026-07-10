package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Todo struct {
	ID        bson.ObjectID `bson:"_id,omitempty" json:"id"`
	Body      string        `bson:"body" json:"body"`
	Completed bool          `bson:"completed" json:"completed"`
}
