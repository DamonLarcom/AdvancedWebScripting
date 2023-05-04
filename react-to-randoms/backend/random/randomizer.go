package random

import (
	"encoding/json"
	"fmt"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/models"
	"github.com/damonlarcom/advancedwebscripting/react-to-randoms/util"
	"log"
	"math/rand"
	"os"
	"strings"
	"time"
)

type options struct {
	FemaleNames []string `json:"female_names"`
	MaleNames   []string `json:"male_names"`
	LastNames   []string `json:"last_names"`
	StreetTypes []string `json:"street_types"`
	CityEndings []string `json:"city_endings"`
	States      []string `json:"states"`
	UsernameA   []string `json:"username_a"`
	UsernameB   []string `json:"username_b"`
}

var JsonOptions options

func ReadJson() {
	log.Println("Reading JSON...")
	jsonContents, err := os.ReadFile("./config/names.json")
	util.CheckErr(err)

	err = json.Unmarshal(jsonContents, &JsonOptions)
	util.CheckErr(err)
}

func GeneratePerson() models.Person {
	//0 is male, 1 is female
	genderRand := rand.Intn(2)

	name := generateRandomName(genderRand)
	numbers := generatePhoneNumber()

	return models.Person{
		Name:     name,
		Login:    generateUsername(),
		Email:    fmt.Sprintf("%s@email.io", strings.ToLower(name.First+name.Last)),
		Dob:      generateDob(),
		Picture:  getImages(genderRand),
		Location: generateLocation(),
		Phone:    numbers[0],
		Cell:     numbers[1],
	}
}

func generateRandomName(gender int) models.Name {
	var first string

	if gender == 0 {
		first = JsonOptions.MaleNames[rand.Intn(len(JsonOptions.MaleNames))]
	} else {
		first = JsonOptions.FemaleNames[rand.Intn(len(JsonOptions.FemaleNames))]
	}

	return models.Name{
		First: first,
		Last:  JsonOptions.LastNames[rand.Intn(len(JsonOptions.LastNames))],
	}
}

func generateUsername() models.Login {
	userA := JsonOptions.UsernameA[rand.Intn(len(JsonOptions.UsernameA))]
	userB := JsonOptions.UsernameB[rand.Intn(len(JsonOptions.UsernameB))]

	return models.Login{
		Username: fmt.Sprintf("%s%s%d", userA, userB, rand.Intn(1000)),
	}
}

func generateDob() models.Dob {
	startDate := time.Date(1950, 1, 1, 0, 0, 0, 0, time.UTC)
	endDate := time.Now().AddDate(-20, 0, 0).UTC()

	duration := endDate.Sub(startDate)
	randomDuration := time.Duration(rand.Int63n(int64(duration)))
	randomDate := startDate.Add(randomDuration)

	return models.Dob{
		Date: randomDate.Format("2006-01-02"),
		Age:  int(time.Now().Sub(randomDate).Hours() / 24 / 365),
	}
}

func getImages(gender int) models.Picture {
	var config map[string]string
	jsonBytes, err := os.ReadFile("./config/config.json")
	util.CheckErr(err)

	_ = json.Unmarshal(jsonBytes, &config)
	url := config["host_url"]

	if gender == 0 {
		url += fmt.Sprintf("/img/men/m%03d.jpg", rand.Intn(40)+1)
	} else {
		url += fmt.Sprintf("/img/women/f%03d.jpg", rand.Intn(40)+1)
	}

	//who cares about the size man
	return models.Picture{
		Medium:    url,
		Large:     url,
		Thumbnail: url,
	}
}

func generateLocation() models.Location {
	state := JsonOptions.States[rand.Intn(len(JsonOptions.States))]
	country := "US"

	//generate postal code
	min := 10000
	max := 99999
	postal := fmt.Sprintf("%d", rand.Intn(max-min)+min)

	//generate street
	streetType := JsonOptions.StreetTypes[rand.Intn(len(JsonOptions.StreetTypes))]
	roadName := JsonOptions.LastNames[rand.Intn(len(JsonOptions.LastNames))]
	street := fmt.Sprintf("%s %s", roadName, streetType)

	//generate city name
	cityPref := JsonOptions.LastNames[rand.Intn(len(JsonOptions.LastNames))]
	suffix := JsonOptions.CityEndings[rand.Intn(len(JsonOptions.CityEndings))]
	city := fmt.Sprintf("%s%s", cityPref, suffix)

	return models.Location{
		Street: models.Street{
			Number: rand.Intn(1000),
			Name:   street,
		},
		City:     city,
		State:    state,
		Postcode: postal,
		Country:  country,
	}
}

func generatePhoneNumber() []string {
	minBeg := 100
	maxBeg := 999
	minEnd := 1000
	maxEnd := 9999

	areaCode := util.RandRange(minBeg, maxBeg)

	numbers := make([]string, 0)
	phone := fmt.Sprintf("(%d)-%d-%d", areaCode, util.RandRange(minBeg, maxBeg), util.RandRange(minEnd, maxEnd))
	cell := fmt.Sprintf("(%d)-%d-%d", areaCode, util.RandRange(minBeg, maxBeg), util.RandRange(minEnd, maxEnd))

	numbers = append(numbers, phone)
	numbers = append(numbers, cell)
	return numbers
}
