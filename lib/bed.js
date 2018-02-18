/*
 * Constructor. Takes a guest object
 */
function Bed(guest) {
  this.guest = guest;
}

/* Setter */
Bed.prototype.fill = function(guest) {
  this.guest = guest;
}

/* Boot out the guest staying in this bed.
 * Returns the guest object*/
Bed.prototype.evict = function() {
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

module.exports = Bed
