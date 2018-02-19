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
 * Actually, this is all roughly the same logic as the first endpoint (99% of the
 * code is shared).
 * Computes a booking using the booking libraries. If that
 * booking is undef, then the request couldn't be satisfied, and we ship
 * back an error. Otherwise, json-ify the booking information and send it
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

/* Third endpoint: get the schedule
 * Return a JSON object representing a list of bookings currently
 * made at the inn
 * TODO: Implement URL param to filter schedule based on booking type e.g.
 * 'cleaning', 'guest', 'etc'
 */
app.get('/schedule', function(req, res) {
  res.status(200).json({
    schedule: inn.schedule.toMap(),
    error: ''
  });
});

app.listen(3000, () => console.log('Booking app listening on port 3000!'));
