Endpoint : POST /api/qrcode

Headers :
- Authorization : token

Request Body :

```json

{
    "deviceId" :"dvc1",
}

```

Response Body Success : 

```json
{
    "data" : {
        "qrcode" : "22323OINJKJOIUOQKJOIOI//.kIjkIhk",
    }
}
```

Response Body Error :

```json
{
    "errors" : "Generate qr code failed"
}
