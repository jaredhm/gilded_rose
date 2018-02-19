/*
 * Constructor. Takes a guest object
 */
function Bed(name, luggage, guest, room) {
  this.name = name;
  this.luggage = luggage;
  // Store this for when we're returning a  booking
  this.maxLuggage = luggage.openSlots;
  this.guest = guest;
  // I hate to architect things like this, but we need to track
  // what bed belongs to a certain room for booking
  this.room = room;
}

/* Setter */
Bed.prototype.fill = function(guest) {
  this.guest = guest;
  this.luggage.fillSlot(guest.luggage);
}

/* Boot out the guest staying in this bed.
 * Returns the guest object*/
Bed.prototype.evict = function() {
  const guest = this.guest;
  this.luggage.freeSlot(guest.luggage);
  this.guest = undefined;
  return guest;
}

Bed.prototype.empty = function() {
  return this.guest === undefined;
}

Bed.prototype.filled = function() {
  return this.guest !== undefined
}

Bed.prototype.openLuggageSlots = function() {
  return this.luggage.openSlots;
}

/*
 * Function for turning this object into a json-ifiable
 * structure
 */
Bed.prototype.toMap = function() {
  return {
    name: this.name,
    guest: this.guest.toMap(),
    openLuggageSlots: this.luggage.openSlots
  }
}

module.exports = Bed
