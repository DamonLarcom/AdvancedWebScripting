package models

type Result struct {
	Amount  int      `json:"amount"`
	Results []Person `json:"results"`
}
