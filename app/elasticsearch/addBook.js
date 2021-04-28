const client = require('./newClient');

/**
 * A function to create indices for elasticsearch and gives 
 * feedback about success or failure. It takes the title and
 * the array of pages and updates the document accordingly.
 */
function addBook (title, content) {

    // Update the index of Elasticsearch.
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
