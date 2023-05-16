package controllers

import (
	"context"
	"encoding/json"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/models"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/util"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	user.Id = primitive.NewObjectID()

	//generate key and add it to user
	keyGen := uuid.New()
	user.Key = keyGen.String()

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	_, err = db.UserCol.InsertOne(context.TODO(), user)
	util.CheckErrInternal(err, w)
	w.WriteHeader(http.StatusCreated)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	util.PrintErr(err)

	//get id of player to update
	userId := chi.URLParam(r, "userId")
	id, _ := primitive.ObjectIDFromHex(userId)

	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"email", user.Email}}}}

	result, err := db.UserCol.UpdateOne(context.TODO(), filter, update)
	util.PrintErr(err)

	//response
	if result.ModifiedCount > 0 {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Updated user email"))
	} else {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No users were updated"))
	}
}
