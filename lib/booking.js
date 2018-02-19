const guestsLib = require('./guests');
/*
 *
 */
function availableRooms(numGuests, numLuggage, inn) {
  let guests = guestsLib.createGuests(numLuggage, numLuggage);
}

module.exports = {
  availableRooms: availableRooms
}
