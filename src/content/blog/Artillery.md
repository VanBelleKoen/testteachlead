---
title: "Artillery: Quick and Simple Load Testing"
description: "How to use Artillery and JSON-SERVER for fast, modern API performance testing."
pubDate: "2025-07-31"
---

# Artillery

For when you need a modern, open-source, quick, clean and simple performance and load testing tool. Artillery provides an answer. So let's talk about how it works.

## Prerequisites

- Node 16.0.1 or greater

Node is required to install the required server package and the actual testing application. In this blogpost we'll use a standalone json-server to have endpoints to test. Considering that we're going to load test a json file, do expect this service to fail because it will.

## Installation

While both applications (Artillery and JSON-SERVER) can be installed globally, best practice dictates that npm packages are installed in a working directory using a package.json file. First we can start by initializing the project. So create a folder and perform the following command. Press enter until out of the flow.

```BASH
npm init
```

Install both applications using the following commands:

```BASH
npm install json-server --save-dev
```

```BASH
npm install artillery --save-dev
```

With these commands the package.json will contain both development dependencies and versioning. And both libraries have been installed and are usable.

### JSON-SERVER

This is a fairly simple application which enables several endpoints. Used for frontend development these endpoints interact with a json file, pretending to be a database.

The different endpoints provide the possibility of faking real user behavior. The load/performance test will be able to POST something and retrieve it. Faking user behavior in a test means the difference between a valid test and screwing around.

>The only difference between screwing around and science is writing it down - Ballistics expert Alex Jason

I know the quote is mostly attributed to Adam Savage. He had it from Alex Jason. Always check sources, people.

Next start the server, so we have something to work against.

```BASH
npx json-server --watch db.json
```

## Usage

Next step we should start configuring our artillery strike. This configuration is essential to fire off the multitude of API calls. Start by creating a file called postPost.yml. First add the coordinates of the strike or the url.

```YAML
config:
  target: "http://localhost:3000"
  phases:
    - duration: 10
      arrivalRate: 2
      maxVusers: 10
      name: Let's go
```

After configuring the target and phases, define the actual scenario to fire. Again for reporting, name the scenario something sufficiently descriptive. Time to get to the meat of the matter, the actual flow.

In this code example a post with a json object has been defined, in which the return object is captured. The point of capturing this object is to use the value in the next call. Being able to chain different calls in such an easy fashion highlights the usability of this tool. Finally declare a get call and utilize the newly captured value using `{{ postId }}`.

```YAML
scenarios:
  - name: "Post and retrieve a post"
    flow:
      - post:
          url: "/posts"
          json:
            title: "json-server"
            author: "typicode"
          capture:
            - json: "$.id"
              as: "postId"
      - get:
          url: "/posts/{{ postId }}"
```

Now, the moment everyone waited for. Let's run the actual test. Inside the directory in which the yaml file is located, run the next command.

```BASH
npx artillery run postPost.yml
```

Enjoy being able to load test anything in a five minute setup.

## Links

- [JSON-SERVER](https://gitlab.com/dennis/json-server)
- [Artillery](http://artillery.io)
