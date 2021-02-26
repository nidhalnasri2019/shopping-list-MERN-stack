const express = require("express");
const mongoose = require("mongoose");
//const bodyParser= require('body-parser')
const path = require("path");
const config = require("config");

const app = express();

//Bodyparser Middleware

//app.use(bodyParser.json());
app.use(express.json());

//Db config
//const db = require('./config/keys').mongoURI
const db = config.get("mongoURI");

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongodb connected.."))
  .catch(err => console.log(err));

// routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});

//
