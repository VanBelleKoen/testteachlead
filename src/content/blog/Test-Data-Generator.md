---
title: "Test-Data-Generator: Automating Test Data for Quality Assurance"
description: "A look at our evolving test-data-generator tool, its features, and how it supports test automation."
pubDate: "2025-07-31"
---

An idea, that evolved into a command line application, into a rudimentary UI application that now became a serverless application. It became a prime example of how we grow as a company and as consultants.

As the company grew, we kept solving the same hurdles. Everyone was reinventing the wheel. So it was time to consolidate our algorithms. And behold, our first iteration of the test-data-generator. While we will continue to improve and expand its functionality, our impatience got the better of us. It was time to share it with the world.

Our generator helps test automation engineers and manual testers generating correct and specific data to test any application. From the specific combination of BIS Numbers to KBO Numbers and even UUID, b.ignited has your test data covered.

An overview of all the test data that can be generated with our tool can be found below. Want to generate other types of data? Let us know, and who knows, we can work it out for you.

## Infrastructure

The Data generator tool is written using Python, deployed as lambda functions on AWS, accessible using the AWS api gateway with a frontend built in angular deployed in an aws cluster.

## Functionality

At the moment we have seven different API requests for your convenience. And several more on the roadmap

### BIS Number

A unique identification number for someone that works in Belgium but doesn't live here. Often these numbers are used for ex pats or seasonal workers. This call handles two different parameters: isGenderKnown and isBirthdateKnown. Both of these influence how the number is generated.

### INSZ Number

Another unique identification number in Belgium, this number is used to identify each civilian in the country. The number is given at birth based on the date of birth and the sex of the baby. This call handles an amount parameter and a birth date parameter. The user can define the amount of insz numbers required.

In the future the gender parameter will be added.

### KBO Number

The unique identification number for companies in Belgium. Every company in Belgium is required to have such a number. Again the amount parameter is used here.

In the future two possible version of this number will be possible. The Belgian government has decided that new kbo numbers will start with a 1 after January 2023.

### Lorem String

At times a text of a specific length is required. And while there is always the option of counting your keystrokes or using word to count the characters, we decided that generating the lorem string to a specific length would be a quality of life improvement. This is done using the length parameter. Another parameter to use here is a lettersOnly, removing any pesky punctuation or spaces.

### NIHII or RIZIV Number

Again a unique identification number, this time of anyone in the medical sector in Belgium. In the request, two different parameters are available. The most important parameter is the profession of the person. As each NIHII or RIZIV number will be different for each profession. So we have provide the eight options: arts, ziekenhuisapotheker, tandarts, vroedvrouw, verpleegkundige, kinesitherapeut, logopedist, apotheker, ziekenhuis, klinisch-laboratorium. The second parameter is the version. Value 1 returns a pre-april 2007 version of the nihii number, while value 2 will generate a post version.

### License Plates

Considering the complexity in creating different license plates, it was an easy decision to automate generating this information for our consultants and colleagues. This request has been kept fairly simple. Just add the type of license plate you wish. The following are all the possibilities: Ancient, Old, Current, Diplomat, Oldtimer, Current Oldtimer, International, Current International, Dealers, Current Dealers, Trailer, Current Trailer, Temporary Plate, Motocycle, current Motocycle, Taxi, Military.

### UUID

In order to facilitate automation we've added the creation of uuid, including it's different versions (1 and 4). It stands to reason that this is a parameter.
