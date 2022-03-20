# Getting started

You can use docker-compose to easily start app.

First of all, install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it on your machine. Make sure you follow all prerequisites.

Now, you can execute this commands:

```
# create custom network to connect front-end and back-end (optional)
docker network create bonsay

# build containers and run application
docker-compose -f docker-compose.dev.yaml up
```
