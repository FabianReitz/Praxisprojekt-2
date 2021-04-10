
docker network create indexed_library_dockernet --driver=bridge
docker run -p 8080:8080 --name nodeApp -d --network indexed_library_dockernet fabian.reitz/indexed-library

docker run -p 9200:9200 -e "discovery.type=single-node" --name elasticsearch -d --network indexed_library_dockernet docker.elastic.co/elasticsearch/elasticsearch:7.11.1
docker run -p 5601:5601 --name kibana -d --network indexed_library_dockernet docker.elastic.co/kibana/kibana:7.11.2