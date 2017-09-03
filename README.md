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
