package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/models"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/util"
	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"net/http"
	"time"
)

func GetPlayersByTeam(w http.ResponseWriter, r *http.Request) {
	var players []models.Player
	abbrev := chi.URLParam(r, "abbrev")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := db.PlayerCol.Find(ctx, bson.D{{"Team", abbrev}})
	if err != nil && err == mongo.ErrNoDocuments {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No players exist for team \"" + abbrev + "\""))
		return
	}

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var player models.Player
		err := cur.Decode(&player)
		util.PrintErr(err)

		players = append(players, player)
	}

	results, _ := json.MarshalIndent(players, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(results)
}

func GetAllPlayers(w http.ResponseWriter, r *http.Request) {
	var cur *mongo.Cursor
	var err error
	var players []models.Player

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if r.URL.Query().Has("last") {
		caser := cases.Title(language.English)
		last := caser.String(r.URL.Query().Get("last"))

		cur, err = db.PlayerCol.Find(ctx, bson.M{"LastName": bson.M{"$regex": last}})
		util.CheckErrInternal(err, w)
	} else {
		cur, err = db.PlayerCol.Find(ctx, bson.D{})
		util.CheckErrInternal(err, w)
	}

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var player models.Player

		err := cur.Decode(&player)
		util.PrintErr(err)

		players = append(players, player)
	}

	results, _ := json.MarshalIndent(players, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(results)
}

func CreatePlayer(w http.ResponseWriter, r *http.Request) {
	var player models.Player

	err := json.NewDecoder(r.Body).Decode(&player)
	player.Id = primitive.NewObjectID()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	_, err = db.PlayerCol.InsertOne(context.TODO(), player)
	w.Write([]byte("Created Player: " + player.FirstName + " " + player.LastName))
}

func UpdatePlayer(w http.ResponseWriter, r *http.Request) {
	var player models.Player
	err := json.NewDecoder(r.Body).Decode(&player)
	util.PrintErr(err)

	fmt.Print(player)

	//get id of player to update
	playerId := chi.URLParam(r, "playerId")
	id, _ := primitive.ObjectIDFromHex(playerId)

	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", player}}

	result, err := db.PlayerCol.UpdateOne(context.TODO(), filter, update)
	util.PrintErr(err)

	//response
	if result.ModifiedCount > 0 {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Updated player with id: " + playerId))
	} else {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No players were updated"))
	}
}

func DeletePlayer(w http.ResponseWriter, r *http.Request) {
	playerId := chi.URLParam(r, "playerId")
	id, _ := primitive.ObjectIDFromHex(playerId)

	result, err := db.PlayerCol.DeleteOne(context.TODO(), bson.M{"_id": id})
	util.CheckErrInternal(err, w)

	if result.DeletedCount == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No player exists with Id \"" + playerId + "\""))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("Deleted player with Id \"" + playerId + "\"")))
}
