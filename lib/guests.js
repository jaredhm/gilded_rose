const Guest = require('./guest');
/*
 *  Creates guest objects, trying its best to split up luggage
 *  evenly among all guests
 *  Returns a list of guest objects
 */
function createGuests(numGuests, luggageCount) {
  let guests = [];
  // For 0..numGuests, create a guest with no luggage
  let i = 0;
  while(i < numGuests) {
    guests.push(new Guest(0));
    i++;
  }
  // Now distribute the luggage as evenly as we can,
  // essentially by cycling through the list of guests
  let j = 0;
  while(j < luggageCount) {
    let guest = guests[j % numGuests];
    guest.luggage++ // Increment the number of pieces of luggage
    j++;
  }
  return guests;
}

module.exports = {
  createGuests: createGuests
}
