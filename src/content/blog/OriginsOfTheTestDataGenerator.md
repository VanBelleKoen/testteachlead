---
title: "What is the b.ignited Test-Data-Generator ?"
description: "An overview of the b.ignited Test-Data-Generator, its purpose, and development."
pubDate: "2023-10-05"
---

The Test-Data-Generator (TDG) is a serverless application, written in python with an angular frontend. And while this is the technical answer, it doesn't answer the question. Even worse, you probably have more questions now.

So the TDG is our attempt to generate valid test data, with a heavy focus on unique numbers and identifiers. And we do this because it is quite difficult to type a correct rrn or iban, without first having to do complex calculations.

## What are we trying to solve?

One of the major hurdles inside testing is finding valid, randomized test data. How many projects do you know where there is a list of iban's or social security numbers somewhere in confluence. And let's be honest here, somewhere in confluence is painfully true.

Our Test-Data-Generator is built specifically to provide testers with easy access to valid test data, regardless of the complexity of that data. And we wanted to provide for both our manual tester colleagues as our own automation needs.

## How did it come to be?

### The tyranny of confluence test data

During one of my projects, I needed several unique identifiers. And as I've mentioned before, there was a confluence page filled with any number I could want. Well, except when the test case required a social security number for a pensioner.

So I did what any engineer would do, and opened google to look for a social security number generator. That test case finished, I moved on to the next. Which presented itself with the same problem. This time it was a child younger than 6 years but older than 4 years. So with renewed hope in the confluence page, I started looking. Obviously, my hopes were quickly and soundly dashed. Because whoever came back from confluence a happy man.

For the next few days, that was my routine. I needed a social security number, I checked the confluence, got disappointed and turned to google.

Until I needed something different, an insurance case file. Again I got the advice to turn to the confluence. Which gave me a list of 50 or so numbers, all of which were already used. And because they were used, they were useless to me unless I cleaned the database.

And that was the proverbial drop that broke the camel's back. In all my frustration, I did what any engineer would do. I wrote some code. Using python, the first iteration of the Test-Data-Generator was alive. Granted, this was a fairly basic CLI program, but it represented something more. Freedom from the tyranny of confluence, randomized test data.

### User feedback

The obvious next step was, besides expansion, would be to share my program with anyone who wanted it. One of the first considerations was that my fellow testers preferred not to use a CLI program. So the application required a user interface. Converting a python command line program into something with buttons was a new and exciting challenge.

After hardly any deliberation and consideration, I opted to use Tkinter. The tiny Test-Data-Generator started on a path towards it second iteration. Extra functions got added alongside the user interface. 

But the most telling change, was the first user feedback. People started to use the Test-Data-Generator. In some sense, those were the first alpha testers of our application. To share the app, it even existed as an executable for a very short period of time. Let's call that iteration 2.5. 

### Connect to the masses

After a long period of silence, together with my colleagues at b.ignited we resurrected the application, or at least the idea of the Test-Data-Generator. We needed a way to reach everyone.

This was the point where the Test-Data-Generator was no longer my little application. Together with several colleagues, we transformed the tiny CLI that could, into a network of AWS lambda functions, managed by AWS Serverless application management, triggered by the API gateway for all to use. And to enjoy.

And for those that wonder about the frontend, that’s a story for another time.

As always, happy testing !


## Links

- [Test-Data-Generator](https://d2r3v7evrrggno.cloudfront.net/)
- [Python tkinter](https://docs.python.org/3/library/tkinter.html)
- [Serverless Application Management](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS lambda functions](https://aws.amazon.com/documentation-overview/lambda/)
