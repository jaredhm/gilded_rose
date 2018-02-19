/*
 * Constructor. Takes a guest object
 */
function Bed(name, luggage, guest) {
  this.name = name;
  this.luggage = luggage;
  this.guest = guest;
}

/* Setter */
Bed.prototype.fill = function(guest) {
  this.guest = guest;
  this.luggage.fillSlot(guest.luggage);
}

/* Boot out the guest staying in this bed.
 * Returns the guest object*/
Bed.prototype.evict = function() {
  this.luggage.freeSlot(guest.luggage.length);
  const guest = this.guest;
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

module.exports = Bed
