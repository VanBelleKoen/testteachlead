---
title: How to Setup a Pre-request Script in Postman
description: Learn how to use Postman's Pre-Request scripts for better API testing.
pubDate: '2025-07-31'
category: api-testing
tags:
  - testing
  - api-testing
---

We all know Postman as an API 'developement|testing' tool, specifically designed for developers. I have seen developers use the environment and global variables feature. Yet we all seem to ignore the possibility to write Pre-Request scripts. The documentation is unclear or too complicated. And I agree, the docs on fully fledged Pre-Request scripts is lacking. So let’s fix that, shall we.

## How Does it Work?

The Pre-Request Script tab in postman allows us to specify actions to be taken before the actually request, ranging from setting a certain variable or preforming a prior-call. Postman will execute any javascript written in that tab before anything else. Take note that this is an option on collection level and request level. So the order of execution must be taken into account.
Collection Pre-Request Script – Request Pre-Request Script – The Actual Request

## To Business

I’ll use the petstore swagger as an example. As the Pre-Request script will create (POST) a pet and use the actual call to GET the newly created pet back.
The function to send a Request in the Script is the following:

`pm.sendRequest(createRequest, (err, res) => {});`

As you can see, I am referring to a variable in the function called createRequest. It is perfectly possible to specify everything you need inside the function itself, yet I find that this reduces the readability too much. So we have to declare a variable.

```
const createRequest = {
    url: 'https://petstore.swagger.io/v2/pet',
    method: 'POST',
    header: {
        'content-type' : 'application/json'
    },
    body: {
        mode : 'raw',
        raw : JSON.stringify({
            "id": 1,
            "category": {
                "id": 23,
                "name": "Mammal"
            },
            "name": "Parpa",
            "photoUrls": [
                "string"
            ],
            "tags": [
            {
                "id": 0,
                "name": "string"
            }
            ],
            "status": "Dead"
            })
}};
```

Few things to pay attention to here, it is required to specify the content-type in the header. The body has the same requirement, for which the property mode is used. The JSON.stringify is needed due to javascript. Else you will be sending an object and not a JSON.

### Maintainability

In order to make the Script more maintenance, let's quickly add another variable.

```
let petId = Math.floor(Math.random() * 100) + 1;
pm.environment.set("petId", petId)
```

This will allow us to call the petId in our const createRequest and in the following call.

`GET https://petstore.swagger.io/v2/pet/{{petId}}`

### The Full Code

```
let petId = Math.floor(Math.random() * 100) + 1;
pm.environment.set("petId", petId)

const createRequest = {
    url: 'https://petstore.swagger.io/v2/pet',
    method: 'POST',
    header: { 
        'content-type' : 'application/json'
    },
    body: {
        mode : 'raw',
        raw : JSON.stringify({
            "id": petId,
            "category": {
                "id": 23,
                "name": "Mammal"
            },
            "name": "Parpa",
            "photoUrls": [
                "string"
            ],
            "tags": [
            {
                "id": 0,
                "name": "string"
            }
            ],
            "status": "Dead"
            })
}};

pm.sendRequest(createRequest, (err, res) => {});
```

`GET https://petstore.swagger.io/v2/pet/{{petId}}`

Enjoy and happy testing

sources:

  [Postman Documentation]( https://learning.getpostman.com/docs/postman/scripts/pre_request_scripts/)

  [Helpful github link]( https://gist.github.com/madebysid/b57985b0649d3407a7aa9de1bd327990)
