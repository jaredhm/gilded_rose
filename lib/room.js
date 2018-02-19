/*
 *  Constructor. Takes a list of beds and a limit on how many
 *  pieces of luggage can be stored
 */
function Room(name, beds, openLuggageSlots, clean = true) {
  this.name = name;
  this.beds = beds;
  // Sorry that this variable has an awful name, but I'm not
  // sure how else to express it. Naming is hard...
  this.openLuggageSlots = openLuggageSlots;
}

/*
 * Function searches through the list of beds
 * and boots a guest. Sorry, pal.
 * Returns undefined if the guest wasn't found in any
 * of the beds. Else, returns the guest
 */
Room.prototype.evictGuest = function(guest) {
  // Determine the index of the bed holding the guest
  const index = this.beds.findIndex(function(bed) {
    return bed.guest === guest;
  });
  // If -1, the guest isn't here
  if(index === -1) { return undefined }
  const evicted = this.beds[index].evict();
  // Reduce the number of pieces of luggage being stored by
  // how many pieces the guest had
  numLuggage = numLuggage - guest.luggage.length;
  return evicted;
}

/*
 * Takes a list of guests, and returns a list of beds that can be
 * used to accomodate a subset of those guests. This function's a little
 * weird, but I think it'll be helpful when we're trying to fill rooms
 */
Room.prototype.canAccomodate = function(guests) {
  let openLuggageSlots = this.openLuggageSlots;
  // Filter out filled beds
  let openBeds = this.beds.filter(function(bed) {
    return bed.empty();
  });
  let viableBeds = [];
  if(this.clean) {
    // Long story short: sort the guests by number of pieces of luggage,
    // with the more loaded-up guests being at the end of the list
    const sortedGuests = guests.sort(function(guestA, guestB) {
      // if A > B, return a positive number, A will be stuck at lower index
      // if A = B, return 0, relative index doesn't matter
      // if A < B, return a negative number, B will be at a lower index
      return guestA.luggage.length - guestB.luggage.length;
    });
    // Run through the guests in sorted order. If we can fill a bed given the number
    // of open luggage slots we have, do it.
    sortedGuests.forEach(function(guest) {
      if(guest.luggage.length <= openLuggageSlots) {
        const viableBed = openBeds.pop();
        // If viableBed was undef, there are no more openBeds
        if(viableBed !== undefined) { viableBeds.push(viableBed); }
        openLuggageSlots = openLuggageSlots - guest.luggage.length;
      }
    });
  return viableBeds;
}

module.exports = Room;
