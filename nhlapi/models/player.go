package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Player struct {
	Id         primitive.ObjectID `json:"id,omitempty" bson:"_id"`
	FirstName  string             `json:"first_name" bson:"FirstName"`
	LastName   string             `json:"last_name" bson:"LastName"`
	Status     string             `json:"status,omitempty" bson:"Status"`
	Team       string             `json:"team,omitempty" bson:"Team"`
	Position   string             `json:"position" bson:"Position"`
	Jersey     int                `json:"jersey_number" bson:"Jersey"`
	Height     int                `json:"height,omitempty" bson:"Height"`
	Weight     int                `json:"weight,omitempty" bson:"Weight"`
	BirthDate  string             `json:"birthdate,omitempty" bson:"BirthDate"`
	BirthCity  string             `json:"birth_city,omitempty" bson:"BirthCity"`
	BirthState string             `json:"birth_state,omitempty" bson:"BirthState"`
}
