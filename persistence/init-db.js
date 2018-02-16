const path = require('path');
const dbPath = path.resolve(__dirname, 'inn.sqlite')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath);

db.serialize(function() {
  // Create the rooms table. I suspect that there's an easier way
  // to create and then prepopulate, but for now we're in callback hell
  db.run(
    `CREATE TABLE rooms(
      id INTEGER PRIMARY KEY,
      sleeps INTEGER NOT NULL,
      stores INTEGER NOT NULL,
      clean INTEGER NOT NULL
    )`
  );
  // Create a table to queue up cleaning jobs
  db.run(
    `CREATE TABLE cleaning_jobs(
      roomid INTEGER PRIMARY KEY,
      timerequested TEXT NOT NULL,
      timetofinish TEXT NOT NULL,
      FOREIGN KEY (roomid) REFERENCES rooms (id)
    )`
  );
});

db.serialize(function() {
// Now that the rooms table is created, populate with data
  db.run(`
    INSERT INTO rooms (id, sleeps, stores, clean)
    VALUES
      (1, 2, 1, 1),
      (2, 2, 0, 1),
      (3, 1, 2, 1),
      (4, 1, 0, 1)
  `);
});

db.close();

