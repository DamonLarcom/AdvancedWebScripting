package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Player struct {
	Id         primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FirstName  string             `json:"first_name" bson:"FirstName,omitempty"`
	LastName   string             `json:"last_name" bson:"LastName,omitempty"`
	Status     string             `json:"status,omitempty" bson:"Status,omitempty"`
	Team       string             `json:"team,omitempty" bson:"Team,omitempty"`
	Position   string             `json:"position" bson:"Position,omitempty"`
	Jersey     int                `json:"jersey" bson:"Jersey,omitempty"`
	Height     int                `json:"height,omitempty" bson:"Height,omitempty"`
	Weight     int                `json:"weight,omitempty" bson:"Weight,omitempty"`
	BirthDate  string             `json:"birth_date,omitempty" bson:"BirthDate,omitempty"`
	BirthCity  string             `json:"birth_city,omitempty" bson:"BirthCity,omitempty"`
	BirthState string             `json:"birth_state,omitempty" bson:"BirthState,omitempty"`
}
