const PriorityQueue = require('priorityqueuejs');
const guestsLib = require('./guests');

const baseRoomCost = 10;
const baseStorageCost = 2;

/*
 * Helper function for computing how much it will cost to let
 * the given guest stay in the given room
 */
function costOfAStay(room, guest) {
  return (baseRoomCost / room.beds.length) +
    (baseStorageCost * guest.luggage)
}

/*
 * Helper function for adding the bed bookings to the
 * schedule object. Takes a list of filledBeds and the inn
 * object
 */
function scheduleBookings(filledBeds, inn) {
  filledBeds.forEach(function(bed) {
    inn.schedule.addBooking(bed);
  });
}

/*
 *  fillBeds - as the name might suggest, takes a number of guests
 *  and a number of needed luggage slots, and attempts to the fill
 *  beds at the in to accomodate. Returns a list of filled beds.
 *
 *  This method is the real booking workhorse. Fills beds in the inn
 *  as efficiently as possible based on luggage constraints and room
 *  open-ness. Sorts guests by luggage needs in ascending order and
 *  greedily fills priority-queue-sorted rooms. Returns a list of
 *  filled rooms.
 *
 *  Note: This DOES mutate the inn object passed in.
 */
function fillBeds(numGuests, numLuggage, inn) {
  // Create some guest objects
  let guests = guestsLib.createGuests(numGuests, numLuggage);
  // First evict any guests that have hit their checkout time
  // between the last call to the route and this one
  inn.schedule.evictGuests();
  // Get all open beds across rooms
  let openBeds = inn.openBeds();
  // Long story short: sort the guests by number of pieces of luggage,
  // with the more loaded-up guests being at the end of the list
  const sortedGuests = guests.sort(function(guestA, guestB) {
    // if A > B, return a positive number, A will be stuck at lower index
    // if A = B, return 0, relative index doesn't matter
    // if A < B, return a negative number, B will be at a lower index
    return guestA.luggage - guestB.luggage;
  });
  // Create a priority queue for allocating beds. Sorted
  // in ascending order based on number of open luggage
  // slots
  let queue = new PriorityQueue(function(bedA, bedB) {
    return bedB.openLuggageSlots() - bedA.openLuggageSlots();
  });
  // Then stick all the beds in the queue
  openBeds.forEach(function(bed){
    queue.enq(bed);
  });
  // Run through the guests in sorted order, tryig to find a room for
  // each of them
  let filledBeds = [];
  sortedGuests.forEach(function(guest) {
    let queueSize = queue.size();
    let nonViableBeds = [];
    let i = 0;
    // Dequeue until we find a suitable bed to accomodate the
    // guest. If all beds are dequeued and we don't find one, this
    // booking won't work
    while(i < queueSize) {
      const viableBed = queue.deq();
      if(viableBed.openLuggageSlots() < guest.luggage) {
        nonViableBeds.push(viableBed);
      } else {
        viableBed.fill(guest);  // Fill the bed and luggage slots
        // Save a pointer to the filled bed so that we can
        // evict the guest if the booking can't be accomodated
        filledBeds.push(viableBed);
        break;
      }
      i++;
    }
    // Enqueue all of the beds that didn't cut it for the next
    // guest
    nonViableBeds.forEach(function(bed) {
      queue.enq(bed);
    });
  });
  return filledBeds;
}

function getAccomodations(numGuests, numLuggage, inn, bookIt = false) {
  // This will be the breakdown on the booking info
  let accomodations;
  // First get the beds filled in trying to accomodate guests
  const filledBeds = fillBeds(numGuests, numLuggage, inn);
  // If this is true, then we're able to accomodate the guest/luggage
  // constraints passed in
  if(filledBeds.length == numGuests) {
    // Initialize a rooms hash to contain info about each room
    // which was booked
    accomodations = { rooms: {}, gold: 0 };
    filledBeds.forEach(function(bed) {
      const room = bed.room;
      // We want to organize the booking data by room. For each
      // bed, check if the room containing it already exists in the
      // map. If it does, push it into the list of booked beds for that room.
      if(room.name in accomodations.rooms) { 
        accomodations.rooms[room.name].beds.push(bed.toMap())
      } else {
        // Otherwise, create value at that key
        accomodations.rooms[room.name] = { beds: [ bed.toMap() ] };
      }
      // Now do pricing if we're actually booking the room
      if(bookIt) {
        accomodations.gold = accomodations.gold + costOfAStay(room, bed.guest);
      }
    });
  } else {
    // If we weren't able to accomodate the request to book, set bookit
    // to false
    bookIt = false;
  }
  // If we're not booking these stays (either simply because
  // the caller doesn't want that, or the request couldn't be
  // satisfied), we need to roll back all the beds we filled
  if(! bookIt) {
    filledBeds.forEach(function(bed){
      bed.evict();
    });
  } else {
    // Otherwise, if the filled beds are final, add them to the schedule
    scheduleBookings(filledBeds, inn);
  }
  return accomodations;
}

module.exports = {
  getAccomodations: getAccomodations
}
