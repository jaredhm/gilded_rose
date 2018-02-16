const express = require('express')
const app = express()
const path = require('path');
const dbPath = path.resolve(__dirname, 'persistence/inn.sqlite')
const sqlite3 = require('sqlite3').verbose();
const dbh = new sqlite3.Database(dbPath);

const bookingLib = require('./lib/booking');

// Install middleware layer to pass database handle in
// as request property
app.use(function (req, res, next) {
  req.dbh = dbh; // Just pass in the dbh
  next(); // Then delegate to route handler
})

/*
 * First Endpoint: checking availabilty
 * Available rooms are determined based on whether any open rooms can
 * accomodate the specified number of guests, pieces of luggage, whether
 * or not the room is clean
 */
app.get('/guests/:numGuests/luggage/:numLuggage', function (req, res) {
  // Get the available rooms based on constraints
  bookingLib.availableRooms(
    req.params.numGuests,
    req.params.numLuggage,
    req.dbh
  ).then(function(rooms) {
    res.send(rooms);
  }).catch(function(err) {
    res.send(err)
  });
})

app.listen(3000, () => console.log('Booking app listening on port 3000!'));
