const app = require('express')();
const bodyParser = require('body-parser');
let serverPort = 8080;

require('dotenv').config()
let mongoUrl = process.env.MONGO_SECRET;

require('./models/categoryModel');
require('./models/gameModel');
require('./models/movieModel');
require('./models/playerModel');
require('./models/voteModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
  console.log("Successfully connected to the database");  
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({"message": "This is the oscar game"});
});

require('./routes/routeIndex') (app);

app.listen(serverPort, () => {
  console.log("Server listening on " + serverPort);
});
