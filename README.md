# Asteroid Tracker

Tracks Near-Earth Objects (NEOs).

## API

### GET /

Returns simple JSON. Can be used as ping check.

__Response:__ ```{ "hello": "world" }```

### GET /neo/hazardous

Returns all potentially hazardous asteroids as JSON.

__Response example:__

TODO:
```{
    "date": "",
    "reference": "",
    "name": "",
    "speed": "",
    "isHazardous": ""
}
```

### GET /neo/fastest?hazardous=(true|false)

Returns fastest asteroid, hazardous or non hazardous. Depends on parameter given.

__Default:__ ```false```

__Response example:__

TODO:
```{
    "date": "",
    "reference": "",
    "name": "",
    "speed": "",
    "isHazardous": ""
}
```

### GET /neo/best-year?hazardous=(true|false)

Returns the year with the most asteroids. Can be narrowed down to hazardous asteroids, depending on parameter given.

__Response example:__

TODO:
```{
    "year": "",
    "asteroid_count": "",
    "isHazardous": ""
}
```

### GET /neo/best-month?hazardous=(true|false)

Returns the month with the most asteroids (TODO rolling month?). Can be narrowed down to hazardous asteroids, depending on parameter given.

__Response example:__

TODO:
```{
    "year": "",
    "asteroid_count": "",
    "isHazardous": ""
}
```

## Additional Information

### TODOS

- Change model so that speed and date are Arrays, as Asteroids may meet the Earth more often than once.
- Check for Promises and if they are caught properly.
- Check if necessary logging is happening.
- Add documentation for lint, test and docker in docs folder
- Add lusca and add user input validation

### Timezone

Timezone used it UTC. Always. Can't stress out how wrong it is to use local time zone!

Yes, you silicon valley companies... with local timezone as default :D

It may be that, depending on your timezone, the tests fail. In MEST mornings the newest day was not yet released.
