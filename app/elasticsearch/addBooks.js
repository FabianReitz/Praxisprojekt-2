const client = require('./newClient');
// const getBook = require('./getBook');
// const createIndex = require('./createIndex');

/**
 * A function to create indices for elasticsearch and gives feedback about success or failure.
 * @param {String} title The title of the book.
 * @param {String} content The content of the book.
 */
function addBooks (title, content) {

    // Create the index for elasticsearch.
    client.update({
        index: 'library',
        type: 'book',
        id: title,
        body: {
            doc: {
                "documentName": title,
                "documentContent": content
            }
        }

        // Log any errors or responses.
    }, function (error, response) {
        if (error) {
            console.log(`The following error occured while creating an index for the book ${title}: `, error);
        } else {
            console.log(`${title} has been updated successfully!`, response);
        };
    });

};

module.exports = addBooks;
