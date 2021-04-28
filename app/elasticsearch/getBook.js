const client = require('./newClient');

/**
 * The function gets a document from the specified index and 
 * returns the according document.
 */
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
