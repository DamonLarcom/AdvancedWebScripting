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
	"net/http"
	"time"
)

func GetAllTeams(w http.ResponseWriter, r *http.Request) {
	var teams []models.Team

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cur, err := db.TeamCol.Find(ctx, bson.D{})
	util.CheckErrInternal(err, w)

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var team models.Team
		err := cur.Decode(&team)
		util.PrintErr(err)

		teams = append(teams, team)
	}

	results, _ := json.MarshalIndent(teams, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(results)
}

func GetTeamByAbbrev(w http.ResponseWriter, r *http.Request) {
	var (
		team models.Team
		err  error
	)
	queryString := r.URL.Query()
	abbrev := chi.URLParam(r, "abbrev")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if queryString.Has("includePlayers") && queryString.Get("includePlayers") == "true" {
		err = db.JoinCol.FindOne(ctx, bson.D{{"Name.Abbrev", abbrev}}).Decode(&team)
	} else {
		err = db.TeamCol.FindOne(ctx, bson.D{{"Name.Abbrev", abbrev}}).Decode(&team)
	}

	if err != nil && err == mongo.ErrNoDocuments {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No team exists with abbreviation \"" + abbrev + "\""))
		return
	}
	util.PrintErr(err)

	teamJson, _ := json.MarshalIndent(team, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(teamJson)
}

func CreateTeam(w http.ResponseWriter, r *http.Request) {
	var team models.Team

	err := json.NewDecoder(r.Body).Decode(&team)
	team.Id = primitive.NewObjectID()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	_, err = db.TeamCol.InsertOne(context.TODO(), team)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Created team: " + team.Full))
}

func UpdateTeam(w http.ResponseWriter, r *http.Request) {
	var team models.Team
	err := json.NewDecoder(r.Body).Decode(&team)
	util.PrintErr(err)

	fmt.Println(team)

	//get id of team to update
	abbrev := chi.URLParam(r, "abbrev")

	filter := bson.D{{"Name.Abbrev", abbrev}}
	update := bson.D{{"$set", buildQuery(team)}}

	//Update Team
	result, err := db.TeamCol.UpdateOne(context.TODO(), filter, update)
	util.PrintErr(err)

	//update team for associated players if the team abbreviation changes
	if len(team.Abbrev) > 0 {
		_, err = db.PlayerCol.UpdateMany(context.TODO(), bson.D{{"Team", abbrev}}, bson.D{{"$set", bson.D{{"Team", team.Abbrev}}}})
		util.PrintErr(err)
	}

	//response
	if result.ModifiedCount > 0 {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Updated team with abbrev: " + abbrev))
	} else {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No team was updated"))
	}
}

func DeleteTeam(w http.ResponseWriter, r *http.Request) {
	abbrev := chi.URLParam(r, "abbrev")

	result, err := db.TeamCol.DeleteOne(context.TODO(), bson.D{{"Name.Abbrev", abbrev}})
	util.CheckErrInternal(err, w)
	if result.DeletedCount == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No team exists with abbreviation \"" + abbrev + "\""))
		return
	}

	_, err = db.PlayerCol.UpdateMany(context.TODO(), bson.D{{"Team", abbrev}}, bson.D{{"$set", bson.D{{"Team", "None"}}}})
	util.PrintErr(err)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("Deleted team \"" + abbrev + "\"")))
}

func buildQuery(team models.Team) bson.D {
	query := bson.D{}

	if len(team.Full) > 0 {
		query = append(query, bson.E{Key: "Name.Full", Value: team.Full})
	}
	if len(team.Abbrev) > 0 {
		query = append(query, bson.E{Key: "Name.Abbrev", Value: team.Abbrev})
	}
	if len(team.City) > 0 {
		query = append(query, bson.E{Key: "Location.City", Value: team.City})
	}
	if len(team.ArenaName) > 0 {
		query = append(query, bson.E{Key: "Location.ArenaName", Value: team.ArenaName})
	}
	if len(team.Division) > 0 {
		query = append(query, bson.E{Key: "Division", Value: team.Division})
	}

	return query
}
