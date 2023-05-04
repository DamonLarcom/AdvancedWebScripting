package handlers

import (
	"encoding/json"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/models"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/random"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/util"
	"net/http"
	"strconv"
)

// GetPeople GET Request handler from router
func GetPeople(w http.ResponseWriter, r *http.Request) {

	// Get the number of people returned from query string
	amount, err := strconv.Atoi(r.URL.Query().Get("results"))
	util.CheckErr(err)

	//set amount to max value if it's over the max
	//return 1 person if results is less than or equal to 0
	if amount > 5000 {
		amount = 5000
	} else if amount <= 0 {
		amount = 1
	}

	//generate the random people
	people := generatePeople(int(amount))

	//wrap results in a results struct that replicates the structure of the original api
	results, err := json.MarshalIndent(models.Result{
		Amount:  amount,
		Results: people,
	}, "", "    ")
	util.CheckErr(err)

	//write response
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(results)
	util.CheckErr(err)
}

func generatePeople(amt int) []models.Person {
	people := make([]models.Person, 0)

	for i := 0; i < amt; i++ {
		newPerson := random.GeneratePerson()
		people = append(people, newPerson)
	}

	return people
}
