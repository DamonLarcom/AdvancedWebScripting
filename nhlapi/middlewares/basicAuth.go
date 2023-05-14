package middlewares

import (
	"context"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/db"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/models"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

type BasicAuth func(h http.Handler) http.Handler

func Basic() BasicAuth {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			//return 401 if no auth is provided
			user, pass, ok := r.BasicAuth()
			if !ok {
				authFailed(w)
				return
			}

			//return 401 if user and pass don't match
			verified := verifyUser(user, pass)
			if !verified {
				authFailed(w)
				return
			}

			h.ServeHTTP(w, r)
		})
	}
}

func authFailed(w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnauthorized)
}

func verifyUser(user, pass string) bool {
	var foundUser models.User

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := db.UserCol.FindOne(ctx, bson.D{{"username", user}}).Decode(&foundUser)
	if err != nil {
		return false
	}

	if pass == foundUser.Password {
		return true
	}
	return false
}
