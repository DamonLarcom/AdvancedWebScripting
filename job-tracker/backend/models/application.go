package models

type Application struct {
	UserId          string            `json:"-" bson:"UserId"`
	Company         string            `json:"company" bson:"Company"`
	Status          string            `json:"status" bson:"Status"`
	ApplicationDate string            `json:"application_date" bson:"ApplicationDate"`
	Skills          []string          `json:"skills,omitempty" bson:"Skills"`
	Notes           []ApplicationNote `json:"notes,omitempty" bson:"Notes"`
}

type ApplicationNote struct {
	NoteTitle string `json:"note_title" bson:"NoteTitle"`
	NoteDate  string `json:"note_date" bson:"NoteDate"`
	Content   string `json:"content" bson:"Content"`
}
