docker container rm myapp
docker image rm myapp:1-SNAPSHOT --force
docker image prune --force