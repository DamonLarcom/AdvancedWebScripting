package main

import (
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/handlers"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/random"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"log"
	"net/http"
)

func main() {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://*"},
		AllowedMethods: []string{"GET", "OPTIONS"},
	}))

	r.Get("/", handlers.GetPeople)
	r.Handle("/img/*", http.StripPrefix("/img/", http.FileServer(http.Dir("./images"))))

	//Read json and make a globally accessable version of it
	random.ReadJson()

	log.Fatal(http.ListenAndServe(":8080", r))
}
