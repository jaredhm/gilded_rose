const express = require('express')
const app = express()

const Inn = require('./lib/model/inn');
const bookingLib = require('./lib/booking');

const inn = new Inn(); // Create the initial inn object

/*
 * First Endpoint: checking availabilty
 * Available rooms are determined based on whether any open rooms can
 * accomodate the specified number of guests, pieces of luggage, whether
 * or not the room is clean
 */
app.get('/booking/guests/:numGuests/luggage/:luggageCount', function (req, res) {
  // Get the available rooms based on constraints
  const booking = bookingLib.getAccomodations(
    req.params.numGuests,
    req.params.luggageCount,
    inn,
    false
  );
  if(booking === undefined) {
    res.status(404).json({
      error: 'Could not accomodate booking'
    });
  } else {
    res.status(200).json({
      booking: booking,
      error: ''
    });
  }
})

/*
 * Second Endpoint: book the rooms
 */
app.post('/booking/guests/:numGuests/luggage/:luggageCount', function (req, res) {
  // Get the available rooms based on constraints
  const booking = bookingLib.getAccomodations(
    req.params.numGuests,
    req.params.luggageCount,
    inn,
    true
  );
  if(booking === undefined) {
    res.status(404).json({
      error: 'Could not accomodate booking'
    });
  } else {
    res.status(200).json({
      booking: booking,
      error: ''
    });
  }
})

app.listen(3000, () => console.log('Booking app listening on port 3000!'));
