const fs = require('fs');
const path = require('path');
const client = require('./elasticsearch/newClient');
const ebooks = './library/ebooks';

/**
 * This function will create an index, look into the library 
 * subrepository and index the names of all the books.
 */
async function createIndex() {
    
    // try-catch block just in case something goes wrong. 
    try {

        let library = await fs.promises.readdir(ebooks);


        // Loop over every folder in the library.
        for (const folder of library) {

            const locationPath = path.join(ebooks, folder);

            const status = await fs.promises.stat(locationPath);

            // Check if folder structure is correct.
            if (status.isDirectory()) {

                library = await fs.promises.readdir(locationPath);

                // Loop over every PDF
                for (const file of library) {

                    // Index the names of the books in individual documents.
                    client.index({
                        index: 'library',
                        id: file,
                        type: 'book',
                        body: {
                            "documentName": file
                        }
                    }, function (error, response) {
                        if (error) {
                            console.log(`The following error occured while creating an index for the book ${file}: `, error);
                        } else {
                            console.log(`${file} has been indexed successfully!`, response);
                        };
                    });
                };
            };
        };
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "Something went wrong: \n", e );
    };

};

module.exports = createIndex;
