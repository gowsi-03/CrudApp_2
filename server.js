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
  })
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
});
app.listen(3000, () => {
  console.log("listening on 3000");
});
