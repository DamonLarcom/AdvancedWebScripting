package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Application struct {
	AppId           primitive.ObjectID `json:"id" bson:"_id"`
	UserId          string             `json:"-" bson:"UserId"`
	Company         string             `json:"company" bson:"Company"`
	Title           string             `json:"title" bson:"Title"`
	Status          string             `json:"status" bson:"Status"`
	Link            string             `json:"link" bson:"Link"`
	ApplicationDate string             `json:"application_date" bson:"ApplicationDate"`
	Skills          []string           `json:"skills,omitempty" bson:"Skills"`
	Notes           []ApplicationNote  `json:"notes,omitempty" bson:"Notes"`
}

type ApplicationNote struct {
	NoteTitle string `json:"note_title" bson:"NoteTitle"`
	NoteDate  string `json:"note_date" bson:"NoteDate"`
	Content   string `json:"content" bson:"Content"`
}
