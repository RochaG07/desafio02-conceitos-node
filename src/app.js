const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;
  const id = uuid();

  const repository = {id, title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs, likes} = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0)
  {
    return response.status(400).json({error: "Repository not found"});
  }

  const repository = {
    id, 
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0)
  {
    return response.status(400).json({error: "Repository not found"});
  }

  repositories.splice(repoIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repoIndex =  repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0)
  {
    return response.status(400).json({error: "Repository not found"});
  }

  const repository = repositories[repoIndex];

  repository.likes++;

  repositories[repoIndex] = repository;

  response.json(repository);
});

module.exports = app;
