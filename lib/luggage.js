function Luggage(openSlots) {
  this.openSlots = openSlots;
}

Luggage.prototype.fillSlot = function(n = 1) {
  this.openSlots = this.openSlots - n;
}
Luggage.prototype.freeSlot = function(n = 1) {
  this.openSlots = this.openSlots + n;
}

module.exports = Luggage
