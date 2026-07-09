---
title: 'Katalon for API Testing: A Practical Guide'
description: Exploring Katalon's features, setup, and scripting for effective API test automation.
pubDate: '2025-07-31'
category: api-testing
tags:
  - testing
  - api-testing
---

While Katalon wants to Simplify API, Web, Mobile Automation Testing, in this post we'll focus purely on API testing. And we'll see how well the slogan represents the product.

## Web-Service Testing

In reference to my postman pre-request script post, we'll attempt the same scenario in Katalon. It will give us a comparable scenario. So we'll preform a POST and a GET in the same testCase.

I always prefer to group a POST and a GET. It allows for a more strict control about the data I sent out. So let's return to the Petstore Swagger and import the Swagger JSON. I must admit that I do like the import options in Katalon: swagger, WSDL and postman. After the swagger import, all the api calls are listed in the object repository. So far, I must admit that Katalon handles the import better. Or more correctly, the UI shows it better.

## Setup on Call Level

In order to be able to add parameters from the test case, it is important to change the GET url to the following and add a variable.

```
https://petstore.swagger.io/v2/pet/${petId}
```

|Name    | Type | Default Value |
|-|:-:|-|
|petId   |Number| 155 |

This makes quickly, manually checking an API call slightly more inconvient. As now, you have to load the variable page and change the value there. Instead of just quickly changing the URL. Does this matter? No. Am I nitpicking? Probably.

The program does not run as smoothly as it should on my machine. Which annoyed me to no end. Opening the variables tab just takes too long (on my machine). So some optimalisation might be required.

## Creating a testCase

Lets start with creating the first testCase. Depending on what you prefer, it's possible to add both API calls using the UI or using code. We'll focus on doing it with code. Partly because code is more fun and because I never got the UI options to work... This due to the lack of documation.

Katalon does translate the code into UI options when switching between the manual and script tab in the testCase. Showing you how it could have been doing using the UI. I have to be honest here and admit that I would never have figured this out. When all is said and done, the UI translation according to Katalon is gibberish for me. So I'll stick with the code.

We'll start with the code to perform the POST.

First I'll define the new request, making a reference to the object repository using the callName. Then I set the body of the POST call and lastly I preform the actual call. Four lines of code are required. Significantly less than postman. And a great deal simpler.

```
def requestPost = ((findTestObject('addPet')) as RequestObject)
String body = '{ "id": 444, "category": { "id": 0, "name": "string" }, "name": "Apples", "photoUrls": [ "string" ], "tags": [{ "id": 0, "name": "string"}], "status": "Shot"}'
requestPost.setBodyContent(new HttpTextBodyContent(body, 'UTF-8', 'application/json'))
WS.sendRequest(requestPost)
```

Make sure that the String body is on a single line. It won't work if you do anything resembling a layout. There are plugins to change this behaviour but I thought it best to stick to the default.

The GET can be reduced to a oneliner, due to the fact that we've setup the call to accept parameters.

```
def resultGet = WS.sendRequest(findTestObject('getPetById', [('petId') : 444]))
```

And that is the complete scenario. Postman does seem to fall short of Katalon here. Both in terms of lines of code, readability (java vs javascript) and how easy it is.

### Manual Import

Sometimes the intellisense is flaky. So best to check if you have the following imports.

```
import com.kms.katalon.core.testobject.ResponseObject
import com.kms.katalon.core.testobject.RequestObject as requestObject
import com.kms.katalon.core.testobject.impl.HttpTextBodyContent
import com.kms.katalon.core.testobject.TestObjectProperty
```

If needed to fix the intellisense, follow to next steps

- Go to window > Katalon Studio Preferences > Java > Editor > Content assist
- In the auto-activation section change the "." to "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz."
- Optional is changing the auto-delay to have a more responsive experience

## Build in Testing

The previous code does not include any type of verification, meaning that if something goes wrong, or the data has been changes by the system, we will not know. So lets add a bit of verification.

```
WS.verifyResponseStatusCode(resultGet, 200)
WS.verifyElementPropertyValue(resultGet, "id", 444)
WS.verifyElementPropertyValue(resultGet, "name", "Apples")
WS.verifyElementPropertyValue(resultGet, "status", "Shot")
```

## In My Humble Opinion

I've only scratched the surface of Katalon's capabilities. But so far it feels promising. Initially I was planning to compare Katalon to Postman. But now I see the differences are too great. Postman works as a quick development aid tool that can be used for testing. Katalon is a full fletched testing tool. So any comparison would be unfair towards Postman.

My major issue is the lack of community. There is very little information to be found. And this for a tool that is four years old. You'd start wondering about the lack of traction. And that is actually my only (major) issue with the program. Katalon is a solid contender in API testing and deserves more attention.

So I will keep you posted.

Happy Testing

### Sources

[PetStore Swagger](https://petstore.swagger.io/)

[PetStore Swagger JSON](https://petstore.swagger.io/v2/swagger.json)

[Katalon Documents](https://docs.katalon.com/katalon-studio/docs/index.html)

[Useful youtube video](https://www.youtube.com/watch?v=v-eBvfkLg-8)
