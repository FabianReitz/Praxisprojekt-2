# Idea for the Praxisprojekt 2

The idea is to index all the e-books from stadt.werks [digital library](https://github.com/stadtwerk/library). 

## Suggested technologies

The following technologies have been suggested by the supervising professor as well as by coworkers of stadt.werk.

- Node.js using the TypeScript language
- Elasticsearch and its BM25 algorithm
- Apache Tika as the framework to convert PDF to text
- Docker to run Node and Elasticsearch in different containers
- Kibana as a GUI for Elasticsearch

## Other things to keep in mind 

- parameterize the Elasticsearch 
- complex requests
- search for title, author, content, year(?)
