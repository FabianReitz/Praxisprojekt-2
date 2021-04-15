const client = require('./newClient');

/**
 * A function to create indices for elasticsearch and gives feedback about success or failure.
 * @param {String} title The title of the book.
 * @param {String} content The content of the book.
 */
function addBook (title, content) {

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

module.exports = addBook;
