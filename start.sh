while ! docker-compose down --remove-orphans; do sleep 1; done
docker-compose build
docker-compose  up -d