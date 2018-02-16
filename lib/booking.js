
/* Returns a promise.
 * Resolves with rooms which satisfy the given constraints as object.
 * Rejects with an error, if there was one
 */
function availableRooms(numGuests, numLuggage, dbh) {
  return new Promise(function(resolve, reject) {
    dbh.serialize(function() {
      dbh.all(
        `SELECT id, sleeps, stores
         FROM rooms
         WHERE clean = 1
          AND sleeps >= ${numGuests}
          AND stores >= ${numLuggage}`,
        function(err, rows) {
          if (err) { reject(err) }
          resolve(rows);
      });
    });
  });
}

module.exports = {
  availableRooms: availableRooms
}
