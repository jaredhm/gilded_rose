/*
 *  Constructor. Takes a name as a string, and a list of bed objects.
 *  For each bed object, assigns itself as that bed's room
 */
function Room(name, beds, clean = true) {
  this.name = name;
  this.beds = beds;
  this.clean = clean;

  // Pass this room object into the bed for it to
  // hold onto. (I don't love this design)
  // Also, I just learned this, but 'this' means something
  // different inside a callback, so we need to store
  // the invocant in a temp variable
  let self = this;
  beds.forEach(function(bed) {
    bed.room = self;
  });
}

/*
 * Convenience function for getting the list of
 * unoccupied beds in a room.
 * Returns a list of beds
 */
Room.prototype.openBeds = function() {
  return this.beds.filter(function(bed) {
    return bed.empty();
  });
}

module.exports = Room;
