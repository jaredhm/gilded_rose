/*
 *  Constructor. Takes a list of beds and a limit on how many
 *  pieces of luggage can be stored
 */
function Room(beds, luggageLimit) {
  this.beds = beds;
  this.numLuggage = 0;
  this.luggageLimit = luggageLimit;
  this.luggage = [];
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

Room.prototype.fillGuest = function(guest) {
  const firstEmptyIndex = this.beds.findIndex(function(bed) {
    return bed.filled();
  });
}

/* 
 * Function which stores a piece of luggage in a room, returning
 * the number of pieces of luggage stored there after. If
 * the piece can't be stored, returns a -1
 */
Room.prototype.storeLuggage = function(luggage) {
  if(this.luggageLimit < this.luggage.length + 1) { return -1 }
  // Array.push returns the size of the array
  return this.luggage.push(luggage);
}

/* 
 * Locate the piece of luggage that matches the one passed in and
 * boot it out of the list. Return the object if it's found,
 * else return undefined.
 * Also, the fact that luggage is both the plural and the singular is
 * really getting me down
 */
Room.prototype.removeLuggage = function(luggagePiece) {
  // First find the darn thing. indexOf() will do object id comparison
  const index = this.luggage.indexOf(luggagePiece);
  // if the luggage array doesn't contain the peice we're
  // trying to boot out, return undef
  return (index === -1) ? undefined : this.luggage.splice(index, 1)[0];
}

module.exports = Room;
