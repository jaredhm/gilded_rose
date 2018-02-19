const moment = require('moment');
const Booking = require('./booking');

function Schedule() {
  this.bookings = [];
  this.earliestCleaningTime;
}

/*
 * Convenience function for getting the next checkout time (which
 * is always the next 'occurance' of 8am)
 * Takes no inputs, returns a moment object
 */
function computeNextCheckout() {
  const eightAMToday = moment().startOf('day').add(8, 'hours');
  let nextEightAM;
  if(Date.now() > eightAMToday) {
    nextEightAM = moment().add(1, 'day').startOf('day').add(8, 'hours');
  } else {
    nextEightAM = eightAMToday;
  }
  return nextEightAM;
}

/*
 * Given a bed, adds a booking which holds that bed
 * and the computed checkout time
 */
Schedule.prototype.addBooking = function(bed) {
  let checkoutTime = computeNextCheckout();
  this.bookings.push(new Booking(
    bed,
    checkoutTime
  ));
}

/*
 * Run through the bookings and kick out any guests
 * that have stayed past their checkout time.
 * Takes and returns nothing
 */
Schedule.prototype.evictGuests = function() {
  this.bookings.forEach(function(booking) {
    if(booking.checkout > Date.now) {
      booking.bed.evict();
    }
  });
}

/*
 * Function for creating JSON-ifiable representation
 * of this schedule object
 */
Schedule.prototype.toMap = function() {
  let bookingMaps = [];
  this.bookings.forEach(function(booking) {
    bookingMaps.push(booking.toMap());
  });
  return bookingMaps;
}

module.exports = Schedule;
