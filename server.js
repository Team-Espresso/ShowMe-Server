'use strict';

require('dotenv').config();
const express = require('express');
const Media = require('./modules/Movies');
const Data = require('./modules/WatchList');
const app = express();
const cors = require('cors');
app.use(express());
app.use(cors());


const PORT = process.env.PORT;

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});

app.get('/movies', Media.handleMovie);
app.get('/shows', Media.handleShow);
app.get('/search', Media.handleSearch);
app.get('/watchlist', Data.getUser);
app.post('/watchlist/movie', Data.addMovie);
app.post('/watchlist', Data.addComment);
app.put('/watchlist/:movieId/:id', Data.updateComment);
app.delete('/watchlist/movie/:movieId', Data.deleteMovie);
app.delete('/watchlist/:movieId/:id', Data.deleteComment);

// app.post('/watchList', Media.addAMovie);
// app.delete('/watchList/:index', Media.deleteAMovie);
// app.put('/watchList/:index', Media.updateAMovie);

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
