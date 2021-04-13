const createLibrary = require('./createLibrary');
const createIndex = require('./createIndex');
const isAlive = require('./elasticsearch/isAlive');

// Check if elasticsearch is up and running.
// Node.js will exit with code 1 if elasticsearch is unreachable.
isAlive();

// Add all the e-books to the database.
// createLibrary();

createIndex();
