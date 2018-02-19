const Luggage = require('./luggage');
const Room = require('./room');
const Bed = require('./bed');
/*
 * Object used to model rooms and beds available at the inn
 */
function Inn() {
  /* 
   * Here's a massive block where we just hard-code the
   * inn configuration. Obviously this would be a bit better
   * if it came from a config file parsed at startup
   *
   * First configure the luggage slots. Since luggage slots
   * are a shared resource among beds, create objects to track
   * that
   */
  let luggage = [
    new Luggage(1),
    new Luggage(0),
    new Luggage(2),
    new Luggage(0)
  ];
  // Configure the rooms
  this.rooms = [
    // ONE room sleeps TWO people and has ONE storage space
    new Room('Foo', [
      new Bed('A', luggage[0]),
      new Bed('B', luggage[0])
    ]),
    // ONE room sleeps TWO people and has ZERO storage space
    new Room('Bar', [
      new Bed('A', luggage[1]),
      new Bed('B', luggage[1])
    ]),
    // ONE room sleeps ONE person and has TWO storage spaces
    new Room('Baz', [
      new Bed('A', luggage[2])
    ]),
    // ONE room sleeps ONE person and has ZERO storage space
    new Room('Quux', [
      new Bed('A', luggage[3])
    ])
  ]
}

/*
 * Convenience function for getting a list of all
 * open beds
 */
Inn.prototype.openBeds = function() {
  let beds = [];
  // Get a list of list of rooms
  this.rooms.forEach(function(room) {
    room.openBeds().forEach(function(bed) {
      beds.push(bed);
    });
  });
  // Then flatten to depth 1
  return beds;
}

module.exports = Inn
