function Guest(luggage) {
  this.luggage = luggage
}

/*
 * Function for turning this object into a json-ifiable
 * structure
 */
Guest.prototype.toMap = function() {
  return {
    luggage: this.luggage
  }
}

module.exports = Guest
