const express = require('express')
const app = express()

const inn = require('./lib/inn'); // Create the initial inn object
const bookingLib = require('./lib/booking');

/*
 * First Endpoint: checking availabilty
 * Available rooms are determined based on whether any open rooms can
 * accomodate the specified number of guests, pieces of luggage, whether
 * or not the room is clean
 */
app.get('/guests/:numGuests/luggage/:luggageCount', function (req, res) {
  // Get the available rooms based on constraints
  bookingLib.availableRooms(
    req.params.numGuests,
    req.params.luggageCount,
    inn
  );
})

app.listen(3000, () => console.log('Booking app listening on port 3000!'));
