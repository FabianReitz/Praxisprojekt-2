const createLibrary = require('./createLibrary');
const createIndex = require('./createIndex');
const isAlive = require('./elasticsearch/isAlive');

// Check if Elasticsearch is up and running.
// Node.js will exit with code 1 if Elasticsearch is unreachable.
isAlive();

// Creating a basic Index and indexing the titles of the books.
createIndex();

// Updating the indexed documents and adding the content to them.
createLibrary();