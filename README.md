# Github Repository Favoriter

This application interfaces with Githubs Rest API's to complete an autocomplete search interface that allows the user of this application to save their favorite repositories/

## Getting Started

First, it's important to note some of the assumptions being made here : 

!! DO NOT USE CHROME -> chrome doesn't allow local resources to be shared.
Instead use Safari if possible.

Expected is a docker contaner instance `reposerver` to be available to port :8080 of the localhost/
localhost is assumed to be `127.0.0.1`
available are these endpoints :

#### Assumed available endpoints

- `GET /health` health check
- `GET /repo/` list all repositories
- `DELETE /repo/[repoID]` delete a repo
- `POST /repo/` create a repository


to run locally:
```bash
npm run dev

```
to build with docker:
```bash
docker-compose up

```
to run tests:
```bash
npm run test

npm run test:coverage

```

### Running the Application

```
$ docker run -p 3000:3000 kihaen/repo-search:latest
```
the image is available via dockers repository as well.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### The Server

**IMPORTANT**: The server is written to store repositories in memory; as such, should you restart/kill the Docker container you will lose your "database"!

### Running the server

```
$ docker run -p 8080:8080 gcr.io/hiring-278615/reposerver:v1.1
```

### More Documentation!

There is more context to the design choices and folder structure iwthin in the /docs folder.