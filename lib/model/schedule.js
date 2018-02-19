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
function computeNextCheckout {
  const eightAMToday = moment().startOf('day').add(8, 'hours');
  let nextEightAM;
  if(now > eightAMToday) {
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
  bookings.push(new Booking(
    bed,
    checkoutTime
  ));
}

Schedule.prototype.evictGuests = function() {
  // Run through the bookings and kick out any guests
  // that have stayed past their checkout time
  bookings.forEach(function(booking) {
    if(booking.checkout > Date.now) {
      booking.bed.evict();
    }
  });
}

module.exports = Schedule;
