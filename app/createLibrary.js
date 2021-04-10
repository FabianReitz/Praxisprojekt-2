const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf-parse');
const ebooks = './library/ebooks';
const addBooks = require('./elasticsearch/addBooks');

/**
 * This function will look into the library subrepository and 
 * add all the PDF files in the 'ebooks' folder.
 */
async function findPDFFiles() {
    
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

                    const dataBuffer = fs.readFileSync(`${locationPath}/${file}`);

                    // Parse the PDF into text.
                    PDFParser(dataBuffer).then(function (data) {

                        // Add the text and the name of the PDF to elasticsearch.
                        addBooks(
                            file,
                            data.text,
                            );
                    });

                }
            };
        };
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "Something went wrong: \n", e );
    };

};

module.exports = findPDFFiles;
