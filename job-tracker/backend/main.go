package main

import (
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
)

func main() {
	r := chi.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", r))
}
