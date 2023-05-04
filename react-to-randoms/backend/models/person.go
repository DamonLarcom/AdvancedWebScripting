package models

type Person struct {
	Name     `json:"name"`
	Dob      `json:"dob"`
	Login    `json:"login"`
	Location `json:"location"`
	Picture  `json:"picture"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Cell     string `json:"cell"`
}

type Name struct {
	First string `json:"first"`
	Last  string `json:"last"`
}

type Dob struct {
	Age  int    `json:"age"`
	Date string `json:"date"`
}

type Login struct {
	Username string `json:"username"`
}

type Location struct {
	City     string `json:"city"`
	State    string `json:"state"`
	Country  string `json:"country"`
	Postcode string `json:"postcode"`
	Street   `json:"street"`
}

type Street struct {
	Number int    `json:"number"`
	Name   string `json:"name"`
}

type Picture struct {
	Medium    string `json:"medium"`
	Large     string `json:"large"`
	Thumbnail string `json:"thumbnail"`
}
