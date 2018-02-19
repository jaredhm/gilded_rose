/*
 * Booking object constructor. A booking represents a blocked
 * off piece of time within a schedule. It holds an associated bed
 * object and a checkout time, represented by a moment object
 */
function Booking(bed, checkout) {
  this.bed = bed;
  this.checkout = checkout;
}

/*
 * Returns booking as a JSON-ifiable object. Takes no arguments
 */
Booking.prototype.toMap = function() {
  return {
    bed: this.bed.toMap(),
    // return checkout as standard ISO-8601 formatted string
    checkout: this.checkout.format()
  }
}

module.exports = Booking;
