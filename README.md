# Asteroid Tracker

Tracks Near-Earth Objects (NEOs).

## How to start the webapp / worker

If you want to start everything by hand, please look into [How to run it by hand](./docs/execution.md).

Otherwise, I would suggest to use docker-compose. FYI: If you start ```docker-compose up``` on an empty database,
it will automatically start to crawl the NASA NEO API until it has all the data.

### docker-compose.yml information

The mongodb port is open for debuggin reasons on 27017. This is not a good idea in production environment.

## API

### GET /

Returns simple JSON. Can be used as ping check.

__Response:__ ```{ "hello": "world" }```

### GET /neo/hazardous

Returns all potentially hazardous asteroids as JSON.

__Response example:__

```JavaScript
[
    {
        "date": "1979-12-17T00:00:00.000Z",
        "reference": "3012393",
        "name": "(1979 XB)",
        "speed": "82895.208318495",
        "isHazardous": true
    },
    {
    
        "date": "1915-08-02T00:00:00.000Z",
        "reference": "3005942",
        "name": "(1994 NE)",
        "speed": "58926.4591259354",
        "isHazardous": true,
    
    },
    /* and far more */
]
```

### GET /neo/fastest?hazardous=(true|false)

Returns fastest asteroid, hazardous or non hazardous. Depends on parameter given.

__Default:__ ```false```

__Response example:__

```JavaScript
{

    "date": "1902-11-19T00:00:00.000Z",
    "reference": "2333755",
    "name": "333755 (2010 VC1)",
    "speed": "99991.3492707527",
    "isHazardous": false

}
```

### GET /neo/best-year?hazardous=(true|false)

Returns the year with the most asteroids. Can be narrowed down to hazardous asteroids, depending on parameter given.

__Response example:__

```JavaScript
{

    "year": 1900,
    "count": 1235

}
```

### GET /neo/best-month?hazardous=(true|false)

Returns the month with the most asteroids (TODO rolling month?). Can be narrowed down to hazardous asteroids, depending on parameter given.

__Response example:__

```JavaScript
{

    "month": 1,
    "year": 1900,
    "count": 119

}
```

## Additional Information

### Additional Documents

- [Tasks](./docs/tasks.md): The tasks that drove the soltion
- [Assumptions](./docs/assumptions.md): Assumptions made during unclarity
- [Next Steps](./docs/next-steps.md): Next steps, that one could make to make it fancier
- [Execution](./docs/execution.md): Execution guide for webapp / worker / gulp tasks

### Timezone

Timezone used it UTC. Always. Can't stress out how wrong it is to use local time zone!

Yes, you silicon valley companies... with local timezone as default :D

It may be that, depending on your timezone, the tests fail. In MEST mornings the newest day was not yet released.
