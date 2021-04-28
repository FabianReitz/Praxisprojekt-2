const client = require('./newClient');

/**
 * Check if Elasticsearch is up and running.
 * Exit the Node.js process if it is not.
 */
async function isAlive () {
    client.ping({
        requestTimeout: 30000,
    }, function (error) {
        if (error) {
            console.error('Elasticsearch cluster is down!');
            process.exit(1);
        } else {
            console.log('Elasticsearch cluster is up and running!');
        }
    });
}

module.exports = isAlive;
