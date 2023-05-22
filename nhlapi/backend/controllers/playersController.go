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

var (
	playerNotFound, _ = json.MarshalIndent(models.Response{Status: 404, Message: "Player not found"}, "", "    ")
)

func GetPlayersByTeam(w http.ResponseWriter, r *http.Request) {
	var players []models.Player
	abbrev := chi.URLParam(r, "abbrev")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := db.PlayerCol.Find(ctx, bson.D{{"Team", abbrev}})
	if err != nil && err == mongo.ErrNoDocuments {
		w.WriteHeader(http.StatusNotFound)
		bytes, _ := json.MarshalIndent(models.Response{Status: 404, Message: "No players exist for team " + abbrev}, "", "    ")
		w.Write(bytes)
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

func GetPlayersById(w http.ResponseWriter, r *http.Request) {
	var player models.Player
	id := chi.URLParam(r, "playerId")
	playerId, _ := primitive.ObjectIDFromHex(id)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := db.PlayerCol.FindOne(ctx, bson.D{{"_id", playerId}}).Decode(&player)
	util.PrintErr(err)

	if err != nil && err == mongo.ErrNoDocuments {
		w.WriteHeader(http.StatusNotFound)
		w.Write(playerNotFound)
		return
	}
	util.PrintErr(err)

	playerJson, _ := json.MarshalIndent(player, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(playerJson)
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
	if len(players) == 0 {
		w.Write([]byte("[]"))
		return
	}
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
	bytes, _ := json.MarshalIndent(models.Response{Status: 200, Message: fmt.Sprintf("Created player: %s %s", player.FirstName, player.LastName)}, "", "    ")
	w.Write(bytes)
}

func UpdatePlayer(w http.ResponseWriter, r *http.Request) {
	var player models.Player
	err := json.NewDecoder(r.Body).Decode(&player)
	util.PrintErr(err)

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
		bytes, _ := json.MarshalIndent(models.Response{Status: 200, Message: "Updated player with ID: " + playerId}, "", "    ")
		w.Write(bytes)
	} else {
		w.WriteHeader(http.StatusNotFound)
		w.Write(playerNotFound)
	}
}

func DeletePlayer(w http.ResponseWriter, r *http.Request) {
	playerId := chi.URLParam(r, "playerId")
	id, _ := primitive.ObjectIDFromHex(playerId)

	result, err := db.PlayerCol.DeleteOne(context.TODO(), bson.M{"_id": id})
	util.CheckErrInternal(err, w)

	if result.DeletedCount == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write(playerNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	bytes, _ := json.MarshalIndent(models.Response{Status: 200, Message: fmt.Sprintf("Deleted player with Id \"" + playerId + "\"")}, "", "    ")
	w.Write(bytes)
}
