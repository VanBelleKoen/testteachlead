---
title: "Insomnia: Effortless API Design and Testing"
description: "A hands-on guide to using Insomnia for building, chaining, and managing API requests with ease."
pubDate: "2025-07-31"
---

> *Design and debug APIs like a human, not a robot.*

In a world of automation and robotisation of everything, this is a slogan that stands out. But mostly because it's confusing. it seems to refer to the easy UI workflow and the lack of any technical knowledge requirement.

Something on which the tool does deliver as promised. Building a request and even some more advanced features like chaining requests use very little technical aptitude.

For example while in postman you'd need javascript knowledge in order to generate a random number, in insomnia it's a dropdown.

## Building a Request

One thing to note about the insomnia UI is that it resembles postman almost to the extreme. Meaning that building a request should be easy enough for everyone. Difference here is that the user will be prompted for a name but has to navigate to the actual request before entering the url.

Start off with the post pet request.

> POST <https://petstore.swagger.io/v2/pet>

And in the body dropdown select JSON and copy paste the following data.

```JSON
{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

Most avid readers of the blog should be familiar with this one. We'll adjust the call as we go along, editing the url with environment variables and generating random data in order to have a better test request.

### Environment Values

When working in the real world with microservices, you'd encounter different development and testing Environment, each with it's own url and several different services which might/should interact with eachother.

As an example:

- <http://petstore.test.io/pet>
- <http://petstore.dev.io/pet>
- <http://petstore.test.io/user>
- <http://petstore.dev.io/user>

So here we have two different applications (pet and user) running on two different environments (test and dev). Easiest option here is to define an environment called the Petstore and store the base_url here.

> Petstore environment:

> 

> - base_url: <http://petstore>

> - petapp: pet

> - userapp: user

> 

After defining the parts of the url that will always remain the some regardless of where you are working, you can start defining subenvironments. Defining subenvironments isn't a must by any means. But as the application grows in complexity, the use of this seperate definitions will aid you in testing and using the API calls.

> Environment Test Environment

> 

> - base_env: test.io

> 

> Environment Test Environment

> 

> - base_env: dev.io

> 

Using the main environment and subenvironment option allows the user to quickly switch between the stages of development and should anything change with the information have a central place of change.

When starting a new request, use CTRL + space in order to select the variables that you want to use. In the end the url will look like the following:

> base_url.test_url/petapp

Take note that the `.` is never mentioned in the variables set, this to increase readablity of the endresult.

### Generating Random Data

This is where insomnia shows it's first major weakness or another strenght depending on your line of thinking. Because there is no way to script anything inside the application as you can do in postman another solution has to be found in order to generate random data entries. Luckily there is a plugin for that, which is something you'll be saying fairly often why using this tool.

For this blogpost the plugin Faker was used. This plugin allows the user to generate most types of data that could be required during API testing.

```Json
{
  "id": "70665",
  "category": {
    "id": "14529",
    "name": "sed"
  },
  "name": "Jennifer Braun",
  "photoUrls": [
    "http://lorempixel.com/640/480/animals"
  ],
  "tags": [
    {
      "id": 0,
      "name": "Senior Markets Representative"
    }
  ],
  "status": "Producer"
}
```

As you can see, all the data in the post pet request has been randomly generated. Does the data make sense? No. Should the data make sense? Also no. The Faker plugin generates data based on which kind of data and which type of data you want. So it can be used to get either random Id's or random words. In the next paragraf, you'll see why this is so important.

## Chaining Requests

As a tester, as someone that prefers to do things in a single click rather than several. This is the most important and valuable feature. So let's explore how difficult or how easy this is in insomnia.

The most obvious route to take here is to post a new pet and get that specific pet based on the ID. We already have a post request so let's start with the get.

Again open a new request, naming it the Get PetById. So as the url enter:

> base_url.test_url/petapp

Mhh, now we need the ID that the POST request used. That's tricky. Not really, in the url bar press ctrl + space and select `Reponse => Body attribute`. After clicking on the new variable select the correct request in the dropdown. So now the Get request has access to the Post request.

Next step is to select the needed property. So using the following method we can select the id.

> $.id

This filter can always be tested inside the response portion of the application at the bottom.

Finally set trigger behaviour on Always and now you have a chained request. It was that simple.

Granted the UI needs some getting use to. But in some ways it beats typing javascript code and storing whatever you need in variables.

## Testing

There are a few plugins that allow evaluation and validation of the response based on javascript code. Meaning the plugin allow the user to write basic JS in order to check or edit a response. None of these plugins seemed enough in order to accept them as testing tools.

So insomnia has no internal or external method to test the actual response besides the good, old fashioned reading method. Not ideal but maybe it's acceptable.

## Conclusion

Without attempting to compare the tool to postman, I must admit that I was impressed. The ease in which I was able to create the request and chain them is definitly a benefit for the application. And I am considering changing from postman to insomnia.

Sadly the lack of integrated testing and the ability to atleast write some code for certain responses is a hurdle.

As it stands, insomnia is an amazing tool that I'd recommend for all but the most complex forms of API testing.

Any project can change in complexity without much advance warning, so even in those cases starting with insomnia is a good idea. As you can export each request in different formats, ranging from curl to java. This functionality enables the user to quickly switch applications if the program falls short.

In conclusion, I'd recommend the application to anyone. But do keep an eye on other options.
