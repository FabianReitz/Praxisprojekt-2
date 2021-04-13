const fs = require('fs');
const path = require('path');
const PDFParser = require('mighty-pdf-parser');
const pageCounter = require('pdf-parse');
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

                    pageCounter(dataBuffer).then(async function(data) {

                        let exportArray = [];
    
                        for (i = 1; i <= data.numpages; i++) {
                    
                            let options = {
                                pageRange: true,
                                startPage: i,
                                endPage: i
                            };
                    
                            // let pageCount = data.numpages;
                            let pageContent = await PDFParser(dataBuffer, options).then(response => {
                                
                                return response.text;
                                
                            });
                            
                            exportArray.push(pageContent);
                            
                            if (exportArray.length == data.numpages) {
                                addBooks(
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
        // Catch anything bad that happens
        console.error( "Something went wrong: \n", e );
    };

};

module.exports = findPDFFiles;
