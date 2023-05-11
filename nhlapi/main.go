package main

import (
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/handlers"
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
	r.Get("/api/teams", handlers.GetAllTeams)
	//Optional: ?includePlayers=true to include teams players (Active and Injured Reserve)
	r.Get("/api/teams/{abbrev}", handlers.GetTeamByAbbrev)
	r.Post("/api/teams", handlers.CreateTeam)
	r.Put("/api/teams/{abbrev}", handlers.UpdateTeam)
	r.Delete("/api/teams/{abbrev}", handlers.DeleteTeam)

	/*
		PLAYERS ROUTES
	*/
	r.Get("/api/players", handlers.GetAllPlayers)
	//?team={abbrev} to specify which team to fetch players for
	r.Get("/api/players/{abbrev}", handlers.GetPlayersByTeam)
	r.Post("/api/players", handlers.CreatePlayer)
	r.Put("/api/players/{playerId}", handlers.UpdatePlayer)
	r.Delete("/api/players/{playerId}", handlers.DeletePlayer)

	//init mongodb connection
	db.Connect()

	log.Fatal(http.ListenAndServe(":8080", r))
}
