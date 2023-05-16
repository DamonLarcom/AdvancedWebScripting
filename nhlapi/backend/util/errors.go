package util

import (
	"log"
	"net/http"
)

func PrintErr(err error) {
	if err != nil {
		log.Println(err)
	}
}

func CheckErrInternal(err error, w http.ResponseWriter) {
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
}
