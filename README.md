## Register

POST `/register`

Payload:
```
{
    "username": String,
    "password": String
}
```

Response:
```
{
    "id": Integer,
    "username": String,
    "hash": String,
    "salt": String,
    "createdAt": Date,
    "updatedAt": Date
}
```

## Login

POST `/login`

Payload:
```
{
    "username": String,
    "password": String
}
```

Response:
```
{
    "id": Integer,
    "username": String,
    "hash": String,
    "salt": String,
    "createdAt": Date,
    "updatedAt": Date
}
```

## Logout

GET `/logout`

Response:
```
Logged out.
```

## Autocomplete

GET `/entries/search?hint=BeginningCharacters`

Response:
```
[
    {
        "location": String
    }
]
```
