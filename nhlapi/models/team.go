package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Team struct {
	Id       primitive.ObjectID `json:"-" bson:"_id"`
	Name     `json:"name" bson:"Name"`
	Location `json:"location" bson:"Location"`
	Division string   `json:"division" bson:"Division"`
	Players  []Player `json:"players,omitempty" bson:"Players"`
}

type Location struct {
	City      string `json:"city" bson:"City"`
	ArenaName string `json:"arena_name" bson:"ArenaName"`
}

type Name struct {
	Full   string `json:"full" bson:"Full"`
	Abbrev string `json:"abbrev" bson:"Abbrev"`
}
