while ! docker-compose -f docker-compose-prod.yml down --remove-orphans; do sleep 1; done
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up -d