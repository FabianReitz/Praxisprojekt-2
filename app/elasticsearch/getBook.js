const client = require('./newClient');

function getBook (index, id) {

    client.get({
        index: index,
        type: book,
        id: id
    }, (error, response) => {
        body = response.body;
    });

    return body;
}

module.exports = getBook;
