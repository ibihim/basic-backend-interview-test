# Execution

## WebApp
The main piece of software in this repository is the WebApp. It has a couple of
routes to return specific NEO data.
If you want to start the WebApp manually, you need Node v8, an API_KEY for NASA 
NEO API and a running mongoDB instance:

```Bash
API_KEY=iojh12390uycalkj3 MONGO_DB_URL=mongodb://localhost:27017/nasa node .
```

## Worker
The additional piece of software in this repository is the worker. It runs
independently and its job is to fill the database every 3 days or starts an
initial filling of the database. The initial filling can take a couple of 
minutes.
If you want to run the worker, you need Node v8, an API_KEY for NASA NEO API and
a running mongoDB instance:

```Bash
API_KEY=iojh12390uycalkj3 MONGO_DB_URL=mongodb://localhost:27017/nasa node worker.js
```


## Linting & Testing
There is a linting and testing setup. Don't use the same database for testing as
for your WebApp. The tests reset the database a couple of times in order to keep
the tests as independent as possible from each other.

If you want to run the tests, you need Node v8,an API_KEY for NASA NEO API and a
running mongoDB instance:

```Bash
API_KEY=iojh12390uycalkj3 MONGO_DB_URL=mongodb://localhost:27017/nasatest gulp verify
```
