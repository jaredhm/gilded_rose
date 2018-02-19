/*
 * Object used to model rooms and beds available at the inn
 */
function Inn() {
  /* 
   * Here's a massive block where we just hard-code the
   * inn configuration. Obviously this would be a bit better
   * if it came from a config file parsed at startup
   */
  this.rooms = [
    // ONE room sleeps TWO people and has ONE storage space
    new Room('Foo', [
      new Bed('A'),
      new Bed('B')
    ], 1),
    // ONE room sleeps TWO people and has ZERO storage space
    new Room('Bar', [
      new Bed('A'),
      new Bed('B')
    ], 0),
    // ONE room sleeps ONE person and has TWO storage spaces
    new Room('Baz', [
      new Bed('A')
    ], 2),
    // ONE room sleeps ONE person and has ZERO storage space
    new Room('Quux', [
      new Bed('A')
    ], 0)
  ]
}

module.exports = Inn
