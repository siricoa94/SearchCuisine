let express = require('express');
const path = require("path");
require('dotenv').config();

let app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('../env.js', (req, res) => {
  const env = { REACT_APP_CUISINE_API: process.env.REACT_APP_CUISINE_API };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, function() {
  console.log(`Server listening on ${PORT}`);
});