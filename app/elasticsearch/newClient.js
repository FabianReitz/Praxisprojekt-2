const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: [ 'http://elasticsearch:9200' ]
});

module.exports = client;