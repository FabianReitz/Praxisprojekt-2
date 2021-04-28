const elasticsearch = require('elasticsearch');

/**
 * This is the connection to Elasticsearch.
 */ 
const client = new elasticsearch.Client({
    hosts: [ 'http://elasticsearch:9200' ]
});

module.exports = client;