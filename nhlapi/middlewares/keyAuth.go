package middlewares

import (
	"context"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/models"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

type KeyAuth func(http.Handler) http.Handler

func Key() KeyAuth {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			//return 401 if no auth is provided
			key := r.URL.Query().Get("key")
			if len(key) < 1 {
				authFailed(w)
				return
			}

			//return true if the key exists in the database
			verifyUser(key)

			h.ServeHTTP(w, r)
		})
	}
}

func authFailed(w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnauthorized)
	w.Write([]byte("Key Auth failed: Key is invalid"))
}

func verifyUser(key string) bool {
	var foundUser models.User

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := db.UserCol.FindOne(ctx, bson.D{{"key", key}}).Decode(&foundUser)
	if err != nil {
		return false
	}

	return false
}
