## Rest - http

- POST -> Create
- GET -> Retrieve
- PUT -> Update
- DELETE -> Delete


## Status Code [HTTP Status Cat](https://www.flickr.com/photos/girliemac/sets/72157628409467125)

- 200 - Ok
- 404 - Not Found
- 201 - Created
- 400 - Bad Request
- 403 - Forbidden
- 500 - Internal Server Error


## Development

```bash
$ npm install
$ npm start
```

## Testando a API pelo terminal

### C:POST (create)
```bash
$ curl -H "Content-Type: application/json" \
  -d '{"name":"Punch Face"}' http://localhost:3000/archives
```

### R:GET (retrieve)
```bash
$ curl -H "Content-Type: application/json" \
  http://localhost:3000/archives
$ curl -H "Content-Type: application/json" \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

### U:PUT (update)
```bash
$ curl -H "Content-Type: application/json" \
   -H "X-HTTP-Method-Override: PUT" -d '{"name":"Try It"}' \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

### D:DELETE (delete)
```bash
$ curl -X POST -H "Content-Type: application/json" \
  -H "X-HTTP-Method-Override: DELETE" \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

