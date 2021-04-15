const fs = require('fs');
const path = require('path');
const PDFParser = require('mighty-pdf-parser');
const pageCounter = require('pdf-parse');
const ebooks = './library/ebooks';
const addBook = require('./elasticsearch/addBook');

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

                // Modify library to the current location.
                library = await fs.promises.readdir(locationPath);

                // Loop over every PDF in the folder.
                for (const file of library) {

                    const dataBuffer = fs.readFileSync(`${locationPath}/${file}`);

                    // Use 'pdf-parse' npm package to get the number of pages in a PDF with 'data.numpages'.
                    pageCounter(dataBuffer).then(async function(data) {

                        let exportArray = [];
    
                        for (i = 1; i <= data.numpages; i++) {
                    
                            // Set options for 'mighty-pdf-parser'. Only parse the current page of the for loop.
                            let options = {
                                pageRange: true,
                                startPage: i,
                                endPage: i
                            };
                    
                            // Use 'mighty-pdf-parser' to parse the content of a PDF page.
                            let pageContent = await PDFParser(dataBuffer, options).then(response => {
                                
                                return response.text;
                                
                            });
                            
                            // Add content of PDF page to array.
                            exportArray.push(pageContent);
                            
                            // Once the length of the array matches the length of the PDF, add it to elasticsearch.
                            if (exportArray.length == data.numpages) {
                                addBook(
                                    file,
                                    exportArray
                                );
                                
                            }

                        }
                        
                    });
                    


                };
            };
        };
    }
    catch( e ) {
        // Catch anything bad that might happen.
        console.error( "Something went wrong: \n", e );
    };

};

module.exports = findPDFFiles;
