# REST

## Http

- POST -> Create
- GET -> Retrieve
- PUT -> Update
- DELETE -> Delete


## [Status Code](http://httpstatusdogs.com)

- 200 - Ok
- 404 - Not Found
- 201 - Created
- 400 - Bad Request
- 403 - Forbidden
- 406 - Not Acceptable
- 500 - Internal Server Error


## Development

```bash
$ npm install
$ npm start
```

## Terminal commands test

### POST (create)
```bash
$ curl -H "Content-Type: application/json" \
  -d '{"name":"Punch Face"}' http://localhost:3000/archives
```

### GET (retrieve)
```bash
$ curl -H "Content-Type: application/json" \
  http://localhost:3000/archives
$ curl -H "Content-Type: application/json" \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

### PUT (update)
```bash
$ curl -H "Content-Type: application/json" \
   -H "X-HTTP-Method-Override: PUT" -d '{"name":"Try It"}' \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

### DELETE (delete)
```bash
$ curl -X POST -H "Content-Type: application/json" \
  -H "X-HTTP-Method-Override: DELETE" \
  http://localhost:3000/archives/2qwesdv3erfdb1qw23erfbvvd
```

## RESTFul API design

- Be RESTFul
- Only 2 URLs
- No verbs
- Use nouns as plurals
- Concrete over abstract
- For JSON follow JavaScript conventions
- Sweep complexity behind the '?'
- Borrow from leading APIs
- Account for exceptional clients
- Add virtualization layer

#### Collections

**/archives** <br/>
**DELETE:** delete all archives <br/>
**POST:** create a new archive <br/>
**GET:** list archives <br/>
**PUT:** bulk update archives

#### Elements

**/archives/:uid** <br/>
**DELETE:** delete Bo <br/>
**POST:** error <br/>
**GET:** show Bo <br/>
**PUT:** if exists update Bo, if not error

#### Method Parameter

**CREATE:** /archives?**method=post** <br/>
**READ:** /archives <br/>
**UPDATE:** /archives/:uid?**method=put**&name=project+name <br/>
**DELETE:** /archives/:uid?**method=delete**

#### Please give me exactly what I need

/archives**?fields=name,image,tags** <br/>
Partials response syntax can help. <br/>
`/owners/:uid?fields=name,tags(name)`

#### What about searching?

**Global:** /**search?q**=project+name <br/>
**Scoped:** /owners/:uid/archives/**search?q**=project+name <br/>
**Formated:** /**search.xml?q**=project+name

#### What about pagination?

/archives?**limit**=10&**offset**=20

#### What about counts?

/archives/**count**

#### What about formats?

/archives**.json** <br>
/archives/:uid**.json**

#### What about defaults?

Format: `json`
Pagination <small>(depends on data size)</small>: `limit=10&offset=0`

#### Versioning

/**v1**/archives

#### What about attribute names?

JavaScript Convention aka `camelCase`

#### What about non-resource-y stuff (aka: Calculate, Translate, Convert)?

User verbs **not** nouns: /**convert**?from=EUR&to=CNY&amount=10

#### Errors
##### Message for people

```json
{
	"responseCode": "401",
	"message": "Verbose, plain language description of the problem with hints about how to fix it",
	"moreInfo":"http://blablabla.com/errors/1234",
	"code": 12345
}
```