# todo-list

## Intro

App Todo list : 
use REST API to add some TODO or another action (CRUD)
Status's TODO life cylce : TODO -> IN_PROGRESS -> DONE, possibility to retry DONE -> TODO etc..

## project structure

/packages 
--todo-backend  ##contains nestjs backend
--todo-frontend ##contains vuejs frontend
docker-compose.yml ##contains mongodb 

## Getting started

### Installation of all dependencies

```bash
yarn  
```


### .env
on packages/todo-backend and packages/todo-frontend
use .env.template to add .env file (keep or change env value)


### launch mongodb

launch mongodb  :
```bash
docker-compose up -d   
```

### launch packages back
launch backend  :

```bash
yarn dev:back
```

### launch packages front
launch front  :

```bash
yarn dev:front
```

### Unit test
To run unit test, use this command : 
```bash
yarn test
```



## Contribute to the projet

To contribute to this projet, please read its guidelines and rules set in [CONTTIBUTING.md](./CONTRIBUTING.md)