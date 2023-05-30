package controllers

import (
	"context"
	"encoding/json"
	"github.com/damonlarcom/advancedwebscripting/job-tracker/db"
	"github.com/damonlarcom/advancedwebscripting/job-tracker/models"
	"github.com/damonlarcom/advancedwebscripting/job-tracker/util"
	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

func GetApplicationsByUser(w http.ResponseWriter, r *http.Request) {
	var apps []models.Application
	user := chi.URLParam(r, "username")

	cur, err := db.JobsCollection.Find(context.TODO(), bson.D{{"UserId", user}})
	util.PrintErr(err)

	defer cur.Close(context.TODO())
	if cur.RemainingBatchLength() == 0 {
		util.ResNoContent(w)
		return
	}
	for cur.Next(context.TODO()) {
		var app models.Application
		err := cur.Decode(&app)
		util.PrintErr(err)

		apps = append(apps, app)
	}

	w.Write(util.MarshalResponse(models.Response{Status: http.StatusOK, Data: apps}))
}

func CreateApplication(w http.ResponseWriter, r *http.Request) {
	var app models.Application
	user := chi.URLParam(r, "username")

	err := json.NewDecoder(r.Body).Decode(&app)
	util.PrintErr(err)

	app.UserId = user
	app.ApplicationDate = time.Now().Format("01/02/2006 15:04")

	//set note date for each note
	for i := range app.Notes {
		app.Notes[i].NoteDate = time.Now().Format("01/02/2006 15:04")
	}

	_, err = db.JobsCollection.InsertOne(context.TODO(), app)
	util.PrintErr(err)
}

func UpdateBaseApplication(w http.ResponseWriter, r *http.Request) {
	var app models.Application
	appId := chi.URLParam(r, "id")
	id, _ := primitive.ObjectIDFromHex(appId)

	err := json.NewDecoder(r.Body).Decode(&app)
	util.PrintErr(err)

	changes := make([]bson.D, 0)
	if len(app.Status) > 0 {
		changes = append(changes, bson.D{{"$set", bson.D{{"Status", app.Status}}}})
	}
	if len(app.Skills) > 0 {
		changes = append(changes, bson.D{{"$push", bson.D{{"Skills", bson.D{{"$each", app.Skills}}}}}})
	}

	results, err := db.JobsCollection.UpdateOne(context.TODO(), bson.D{{"_id", id}}, changes)
	util.PrintErr(err)
	if results.MatchedCount == 0 {
		util.ResNotFound(w)
	}

	w.Write(util.MarshalResponse(models.Response{Status: http.StatusOK, Message: "Application successfully updated"}))

}

func AddApplicationNote(w http.ResponseWriter, r *http.Request) {
	var notes []models.ApplicationNote
	appId := chi.URLParam(r, "id")
	id, _ := primitive.ObjectIDFromHex(appId)

	err := json.NewDecoder(r.Body).Decode(&notes)
	util.PrintErr(err)

	for i := range notes {
		notes[i].NoteDate = time.Now().Format("01/02/2006 15:04")
	}

	results, err := db.JobsCollection.UpdateOne(context.TODO(), bson.D{{"_id", id}},
		bson.D{{"$push", bson.D{{"Notes", bson.D{{"$each", notes}}}}}})
	util.PrintErr(err)

	if results.MatchedCount == 0 {
		util.ResNotFound(w)
		return
	}
	w.Write(util.MarshalResponse(models.Response{Status: http.StatusOK, Message: "Note(s) added to application"}))
}
