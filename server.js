//requiring dependencies 
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
//setting the port for the app in localhost to 3002
var PORT =   process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
//compression make that the app would work without internet
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});