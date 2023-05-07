package db

import (
	"context"
	"github.com/damonlarcom/advancedwebscripting/nhlapi/util"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const uri string = "mongodb://root:password123@localhost:27017/"

var (
	MongoConn *mongo.Client
	PlayerCol *mongo.Collection
	TeamCol   *mongo.Collection
	JoinCol   *mongo.Collection
)

func Connect() {
	var err error

	MongoConn, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	util.PrintErr(err)

	db := MongoConn.Database("nhl")
	//init collections
	PlayerCol = db.Collection("players")
	TeamCol = db.Collection("teams")
	JoinCol = db.Collection("team_players")

}
