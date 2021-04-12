const client = require('./newClient');
const getBook = require('./getBook');

/**
 * A function to create indices for elasticsearch and gives feedback about success or failure.
 * @param {String} title The title of the book.
 * @param {String} content The content of the book.
 */
function addBooks (title, pages, page, content) {

    const { oldContent } = getBook('library', title).documentContent;

    // Create the index for elasticsearch.
    client.index({
        index: 'library',
        id: title,
        type: 'book',
        body: {
            "documentName": title,
            "documentPages": pages,
            "documentContent": oldContent.page = content
        }

        // Log any errors or responses.
    }, function (error, response) {
        if (error) {
            console.log(`The following error occured while creating an index for the book ${title}: `, error);
        } else {
            console.log(`${title} has been indexed successfully!`, response);
        };
    });

};

module.exports = addBooks;
