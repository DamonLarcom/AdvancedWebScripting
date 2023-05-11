package main

import (
	"fmt"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/controllers"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"log"
	"net/http"
)

func main() {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	/*
		TEAMS ROUTES
	*/
	//Returns only team info, no players
	r.Get("/api/teams", controllers.GetAllTeams)
	//Optional: ?includePlayers=true to include teams players (Active and Injured Reserve)
	r.Get("/api/teams/{abbrev}", controllers.GetTeamByAbbrev)
	r.Post("/api/teams", controllers.CreateTeam)
	r.Put("/api/teams/{abbrev}", controllers.UpdateTeam)
	r.Delete("/api/teams/{abbrev}", controllers.DeleteTeam)

	/*
		PLAYERS ROUTES
	*/
	//Optional: ?last={lastName} to search for players with a last name
	r.Get("/api/players", controllers.GetAllPlayers)
	//?team={abbrev} to specify which team to fetch players for
	r.Get("/api/players/{abbrev}", controllers.GetPlayersByTeam)
	r.Post("/api/players", controllers.CreatePlayer)
	r.Put("/api/players/{playerId}", controllers.UpdatePlayer)
	r.Delete("/api/players/{playerId}", controllers.DeletePlayer)

	//init mongodb connection
	db.Connect()

	fmt.Println("Running NHL API...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
