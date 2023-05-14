package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Team struct {
	Id       primitive.ObjectID `json:"-" bson:"_id,omitempty"`
	Name     `json:"name" bson:"Name"`
	Location `json:"location" bson:"Location"`
	Division string   `json:"division" bson:"Division,omitempty"`
	Players  []Player `json:"players,omitempty" bson:"Players,omitempty"`
}

type Location struct {
	City      string `json:"city" bson:"City,omitempty"`
	ArenaName string `json:"arena_name" bson:"ArenaName,omitempty"`
}

type Name struct {
	Full   string `json:"full" bson:"Full,omitempty"`
	Abbrev string `json:"abbrev" bson:"Abbrev,omitempty"`
}
