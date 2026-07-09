---
title: Postman Testing Guide
description: A comprehensive guide on how to test APIs using Postman, covering everything from basic to advanced features.
pubDate: '2023-10-07'
category: api-testing
tags:
  - testing
  - api-testing
---

## A Short How-to-test Using Postman

## Introduction to Postman

Originally meant to be used as a development tool, Postman quickly released new features to support every stage of the API development stage. Yet surprisingly I've seldom seen Postman being used to it's full potential.
In terms of testing, it is possible to create full endToEnd flows, perform contract validation, mock responses, validate return data while using randomise data and so on...

This enormously versatile tool always seems to be used in manually testing an API call. Pressing the button and checking if a 200 response has been returned.

> Works as designed but not as intended

Not adding simple tests in order to check if a call responded in a timely fashion or even if the call was successful could be a huge time saver. Many of these tests can be added using the Testing Script examples. Even moving data around becomes easy using the global or environment variables in Postman. So where to begin?

## Adding a New API Call

### Importing the Requests

In terms of importing, Postman offers several options. Easiest way off course would be to import a Postman collection or use a swagger link. These will respect the subdivision that was used before. So all request will be place inside the correct collection. When using cURL or building the request from scratch you'll have to drag&drop the request into a collection.

The most handy feature here is that Postman is able to import the full swagger in one go. This is especially useful when new people start on a project. Take note here that if you already have a rich Postman collection for all your API's. Importing those json files is going to be more beneficial.

Wait? I have to manually import json files into Postman? Yes, the feature to share calls in a team has a limitation of 25 calls on the free version. We have to be realistic here. Not many projects have less than 25 requests. Importing the files manually shouldn't take that much time. But it will save the expense of purchasing the pro/enterprise edition.

### Manually Adding the Call

While the process is fairly self explanatory, we'll quickly iterate over the steps. When adding the new request, you'll find that the name of the request is required, as is a collection to store the request. When doing this, think carefully about the collection as these become important when doing collection runs or exporting the collection for team-mates. When the first step has been completed Postman opens the request in tab. Now is the time to add the URL and setting the protocol. By default postman sets the protocol to GET. To add the URL, you can always use the dev tools of your favourite browser to copy paste the url.

The same can be done to add the headers and body into the request. And that's about it. Do not forget to save the new request. Postman does not have an auto-save feature. This has been a huge pain as I often forget to save.

Now you should have an empty request. Meaning the request works and it does what it's suppose to. Yet there are no tests written. Which for me means you have an empty request.

## Tests

It would be useful to follow the guide along with the petstore API calls. This will help understanding some features and actions. For those unfamiliar with the petstore, I will include a link at the bottom of the page.

### Generic and General Tests

Most importantly, we should know if a request was a success. Everything stems from receiving that valued 2xx response code. So it's only logical that this becomes our first test. Inside the request you have the tab tests, you can paste the following code snippet there.

```javascript
pm.test('Request to be a success', function () {
  pm.expect(pm.response.to.be.success)
})
```

This test will validate if the response has a statusCode with the success range. In essence this checks if the response code has the following format 2xx. It is possible to check this more specific. Using one of the next code snippets:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Successful POST request", function () {
    pm.expect(pm.response.code).to.be.oneOf([201,202]);
});
```

Another usefull test would be to validate the headers. Header values are often used in terms of security. For example:

```javascript
pm.test("Redirect location is correct", function () {
   pm.response.to.have.header("Content-Type");
   pm.response.to.be.header("Content-Type", "application/json");
});
```

In this test, the header Content-Type is being validated twice. It's always preferable that when a test fails that you know immediately why the test has failed. If only the last line is used, the test might fail due to the Content-Type header not to exist or the value isn't an application/json. Due to the ambiguity of the failure, it is preferable to test both. This ensures that the test feedback is sufficiently specific in order to start fixing/reporting the issue. Any header and header-value can be checked using that format.

Because the previous tests were fairly generic, it is possible to declare them on a collection level. Hover on top of the collection name and select the three dots. Here you can pick the option edit in order to add the tests. Same as before open the tab tests and paste the code snippets. Important to note here is that these tests will run for every single request inside that collection. Meaning that if there is a request with a different Content-Type header, that test will result in a fail. So declaring tests on collection level requires you to think about the response of each request. In practise I try to get as many tests as possible into the collection level. Just for the maintainability of the test suite. Due to this I'll sometimes split the Content-Type test in two different ones. Each on it's own level. For the collection level I would test if a Content-Type header exists:

```javascript
pm.test("Redirect location is correct", function () {
   pm.response.to.have.header("Content-Type");
});
```

And on the level of the request itself, I'd test the actual value. That way I do not lose any feedback while still having a manageable collection.

```javascript
pm.test("Redirect location is correct", function () {
   pm.response.to.be.header("Content-Type", "application/json");
});
```

Now that we can validate both the header and the responseCode, it is time to move on to the body. Due to the request specific nature of the body, I always (as a force of habit) set body tests on the request level. It is possible to set **some** tests for the body on the collection level. I prefer not the do it. So when I have to change or adjust a test concerning the body, I know where to look.

### More Specific Tests

More specific tests would be the validation of the response, meaning that we'd check for data values or even the json-schema. Validating that the response json-schema is correct is always a great idea, as any changes to this might be considered a breaking change.

While postman has schema validation tests suite, I find that these preform unreliable and unclear. So I prefer to use a longer but more reliable method, using the pm.expect format. Writing these type of tests will require some javascript knowledge, or basic copy paste skills.

```javascript
  // Declaring the response as a variable
var jsonData = pm.response.json();

pm.test("Response data format is correct", () => {
    // Check the types are correct
    pm.expect(jsonData).to.be.an('object');
    pm.expect(jsonData.data).to.be.an('object');
    pm.expect(jsonData.data.nestedValue1).to.be.a('boolean');
    pm.expect(jsonData.data.nestedValue2).to.be.a('string')
});

pm.test("*****", function () {
  // Check the values
    pm.expect(jsonData.data.nestedValue1).to.be.true;
    pm.expect(jsonData.data.nestedValue2).to.match('I`m a string');
    });
});
```

The previous code snippet does a few things, starting with the declaration of the jsonData variable. As the pm.response is in essence an object, calling .json() is needed in order to have a json to work with.

The following steps validate if the jsonData has the correct types. So we're able to check if the value we get back is in fact a string or a boolean. These type of tests are data-independent and are always the preferred method if you do not have 100% control over the data. This will reduce the false positives.

In the final step we're able to check the actual data. As you can gather, validation towards specific response is not something that should be done on collection level.

So now we're about to add an API request using several different ways and writing some basic tests on the collection and request level. Let us move on towards global and environment variables. One of the lesser used strengths of Postman.

## Variables

### Environment Variables

In Postman it is possible to declare variable in a specific environment. For example, while testing an API call on DEV I could add the URL of dev as an environment variable in the dev environment, while I declare the same variable name on the test environment. My url would be {{URL}}/api/request while the environment will dictate the actual value.

This enables users to make a single request for every environment. While it is possible to declare data variables inside the environment variables, I strongly advice against it. Doing this will force you to declare those variables in each environment, while declaring these as a global variable would prevent this.

It is always best to adhere to the intention in the name. So environment specific variables should always be declared in the environment option and not as globals.

```javascript
pm.environment.set(variableA, "ValueA")
```

As soon as this is done, you can always use that variable with the following syntax

```javascript
{{variableA}}
```

### Global Variables

Considering the ease in which variables can be declared and fetched, this feature should be used as often as possible. Enabling the user to work with data-files or randomised data as generated with pre-request or test-scripts.

Both global and environment variables are long-lived. They'll remain in existence until manually removed or reset. When chaining different requests in a collection these long-lived variables will play a key role.

## Collection Run

When first creating a request in Postman, you always have to pick a collection in which to store that specific request. These collections can/should be used to chain the different requests. This will allow a full end2end test. As an example, in the petstore you could Post a new pet. The following request in the collection could be getting the newly created pet. By doing this, you'd have created a full end to end test. Using the global variables in order to pass the Id from the POST to the GET will facilitate randomising the data here. In a pre-request script, you can generate a random number, assign that value to a global variable and use if in the actual body of your request in both the POST and as a parameter of the GET. We'll talk about pre-request scripts later on.

These collections can be export as a json, this comes in handy when using newman. Newman is the command line integration for Postman, allowing you to quickly and efficiently run those jsons files. There is an integrated collection runner off course. Here you can review every request and every response in order, this will enable you to troubleshoot the collection or your application.

When running a collection run in the GUI, the results are based on the amount of tests you have. So running a collection that contains three requests with each five tests will result in a total of fifteen results, each given a fail or a pass. So the individual requests are not seen as a test. You can also declare the amount of iterations you want for the collection. Meaning you could run the whole collection multiple times. If you're using a dataFile, the iteration counter allows you to reduce or increase the amount of runs. We'll talk about the dataFile later on. First we should discuss Pre-request scripts as these are the bread and butter of an advanced Postman user.

## Pre-request Script

When running a Postman Request everything is done in a certain sequence. This sequence enables us to define variables before the actual Request.

```
Collection Pre-Request => Request Pre-Request => Request => Collection Tests => Request Tests
```

These Pre-Request can be anything, you could code in javascript. A favourite example is generating an id and passing it as a global variable, or any other value required in the Request. Another option is to preform a Request before the request you want to test. This could be useful when a backend application must return the value you need. I've used this in order to GET JWT tokens from the backend. In the following script I generate an random id, before declaring the request. The last line is sending the pre-declared request. Using the response of a request script then becomes fairly easy, the only thing here is that you must stringify the response before you can parse it into a usable json.

```javascript
let petId = Math.floor(Math.random() * 100) + 1;
pm.globals.set("petId", petId)

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

pm.sendRequest(createRequest, (err, res) => {
  let jsonData = JSON.parse((JSON.stringify(res.headers)));
  let jwtToken = jsonData.find( x => x.key === 'Authorization').value;

  pm.globals.set("jwtToken", jwtToken);
});
```

One of the advantages here is that you could create a single collection testing the full CRUD. Each request would be data independent of the previous requests, because each Pre-Request script will created a new dataset. Due to this data-independence a single request can fail without affecting the others in the collection.

In this fashion Postman allows you to create a single collection that could test your entire application or a collection for each feature, depending on the size of the application.

## Data File

The dataFile is one huge json containing all the information required for the call. Meaning that the collection runner will iterate over the entire json, for each subJson found. For example:

```javascript
{
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"},
  {"name":"value"}
}
```

By importing that dataFile, the request will run for ten times in the collection runner. You could change the amount of iteration. For example, if you tell Postman to run 20 iteration, it will loop twice over the jsonFile, always starting from the top. So when running only four iterations, it will be the first four in the dataFile.

## Newman

The commandline integration tool for postman will enable us to run Postman collection in commandline or even better, integrated with jenkins. Install it using `npm i -g newman` and you're ready to go.

```bash
newman run "collectionName.postman_collection.json" -g "globalExport.postman_globals.json" -e "dev.postman_environment.json" -d "dataAanvraag.json" --delay-request 2000
```

In this collection run, I import my global variable and environment variables using respectively -g -e. And my data file with the -d. So in jenkins or gitlab, devops could use newman to test all API's in the application and based on the results rollback the changes of the developer with a notification. Making Postman an excellent tool to test API calls.

## Links

- [Postman - Get started](https://www.getpostman.com/)
- [Postman - Documentation](https://learning.getpostman.com)
- [Petstore swagger](https://petstore.swagger.io/)
