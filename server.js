const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connectionString =
  "mongodb+srv://gowsi03:gowsi2001@cluster0.steffn5.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");
    app.use(bodyParser.json());

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log("Data inserted Successfuly !");
          res.redirect("/");
        })
        .catch((err) => console.error(err));
    });

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((result) => {
          res.render("index.ejs", { quotes: result });
        })
        .catch((err) => console.error(err));
    });

    app.put("/quotes", (req, res) => {
      console.log(req.body);
    });
  })
  .catch((error) => console.error(error));

app.listen(3000, () => {
  console.log("listening on 3000");
});
