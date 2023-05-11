package middlewares

import "net/http"

type BasicAuth struct {
}

func (b BasicAuth) New() {
	return func(h handler)
}

func (b BasicAuth) ServeHTTP(w http.ResponseWriter, r *http.Request) {

}
