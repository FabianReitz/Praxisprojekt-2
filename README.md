# Praxisprojekt 2: indexed_library

This repository is a project for the [DHSH](https://www.dhsh.de) and [stadt.werk](https://stadtwerk.org). Its 
purpose is to index the existing [digital library](https://github.com/stadtwerk/library) of stadt.werk and make 
it searchable.

## Structure of this repository 

### ./app/

... contains the actual code for the program itself. The necessary docker files for creating the container are found here.

#### ./app/library/

... contains the [digital library](https://github.com/stadtwerk/library) of stadt.werk and will be a submodule
of this repository.

### ./documentation/

... contains the documentation, ideas, proof of sources and the finished assignment that will be handed to the supervising
professor.

## Getting Started
Clone the repository to a nice place on your machine.

### Requirements
- You need access to the [digital library](https://github.com/stadtwerk/library) of stadt.werk. 
- You need Docker installed on your system.

### Setting everything up
Start by changing the directory to `./app`. 

Run `docker build -t fabian.reitz/indexed_library .` to create an image. This image will be a preset for the Node.js container of this project.

Run `docker compose up` to create the containers, create a Docker network and start the individual containers. This may initially take a while depending on your internet speed. In some cases, the Node.js container will try to start while Elasticsearch is still starting. In this case the Node.js container will exit with `status code 1`. Just wait some time and try to restart the container.

You can access Kibana with your browser by visiting `http://localhost:5601`. 
