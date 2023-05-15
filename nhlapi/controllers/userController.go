package controllers

import (
	"context"
	"encoding/json"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/models"
	"github.com/google/uuid"
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
	w.Write([]byte("Created User: " + user.Username))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {

}
