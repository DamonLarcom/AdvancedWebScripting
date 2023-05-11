package middlewares

import "net/http"

type BasicAuth struct {
}

func (b BasicAuth) New() {
}

func (b BasicAuth) ServeHTTP(w http.ResponseWriter, r *http.Request) {

}
