# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :
- Authorization : token

Request Body : 

```json
{
    "firstName" : "Ahya",
    "lastName" : "Ahmad Yani",
    "phone" : "32323233232"
}
```

Response Body Success :

```json
{
    "data":{
        "id": 1,
        "firstName" : "Ahya",
        "lastName" : "Ahmad Yani",
        "phone" : "32323233232"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization : token

Request Body : 

```json
{
    "firstName" : "Ahya update",
    "lastName" : "Ahmad Yani",
    "phone" : "32323233232"
}
```

Response Body Success :

```json
{
    "data":{
        "id": 1,
        "firstName" : "Ahya",
        "lastName" : "Ahmad Yani",
        "phone" : "32323233232"
    }
}
```
Response Body Error :

```json
{
    "errors": "Email is not valid format"
}
```

## GET Contact API

Endpoint : POST /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data":{
        "id": 1,
        "firstName" : "Ahya",
        "lastName" : "Ahmad Yani",
        "phone" : "32323233232"
    }
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Query Params : 
- name  : Search by firstName or lastName, using like query, optional
- email : Search by email, using like query, optional
- phone : Search by phone, using like query, optional
- page  : number of page, default 1
- size  : size per page, default 10

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "firstName" : "Ahya",
            "lastName" : "Ahmad Yani",
            "phone" : "32323233232"
        },
        {
            "id": 2,
            "firstName" : "Nana",
            "lastName" : "nana",
            "phone" : "323232335555"
        },
    ],
    "paging" :{
        "page":1,
        "totalPage": 3,
        "totalItem": 30
    }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data":"OK"
}
```

Response Body Error :

```json
{
    "error": "Contact is not found"
}
```