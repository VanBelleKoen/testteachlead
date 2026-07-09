---
title: 'Tricentis Tosca: Automated Continuous Testing Reviewed'
description: A hands-on review of Tricentis Tosca, its drag-and-drop approach, ease of use, and technical depth for test automation.
pubDate: '2025-07-31'
category: testing
tags:
  - testing
  - test-tools
---

A few months ago, we received a demo about Tricentis Tosca as a testing tool. Their Tricentis Tosca would be the solution for continuous automated testing. We as testers were immediately skeptical. It seemed too good to be true. How it was explained to us, writing tests would be a matter of drag&drop, no technical skill required.

Built and designed for business owners and analysts to write the tests themselves.

## How Does it Work ?

Tosca as an application scans the webpage and with mouse click events, the user imports the buttons. Immediately Tosca starts checking if all objects are uniquely identifiable. And this is enough to have a module of that specific page. You could compare each module with a page-object as you would use it in frameworks using selenium.

After the creation of a module, simply drag&drop the module into a testCase folder and you're ready to go. Next step would be to add data. Data in Tosca can be set dynamically or hard-coded. Then after some more drag&drop sequences, Tosca generates additional test cases based on the data in dropDowns on the webpage.

Next steps included even more drag&drop magic and suddenly you have 15 tests for that specific webpage. Take note that no asserts have been added at this point. As long as Tosca is able to fill in the data in the various input fields, the test will pass.

If your webpage has validation error messages, you'll have to trigger all of them and rescan. So now you can do an isVisible check.

So it Tosca really the answer for Test automation? Is Tosca Test Automation made easy ?

## Ease of Use

Yes and No, to quote John Green:

>Truth resists simplicity.

As a person with a fairly technical background, drag&drop felt somewhat strange to me. Mostly because I did not know all the actions Tosca was doing behind the scene. It felt uncomfortable to auto-generate 20 tests without knowing exactly what was happening. Yet maybe we don't need to know. Maybe we should trust this impressive piece of software to get it right. They developed this, and put it in production. Surely it has been tested extensive? `flashbacks to several projects, sirens in the distance.` It has to be said that I did not encounter significant bugs. So maybe we should trust it.

Tosca is easy to use. But not that easy to understand. A great deal seems to be happening under the hood. And while taking advantages of the first two (free) certification courses I was unable to figure it out, or to just find it online for that matter.

## Technically Demanding ?

No, it is doable for an analyst or just anyone to follow the tests and produce decent tests. No coding is needed whatsoever. Mhhh, it does help to know the logical gates. And if the identifiers during a scan aren't unique, you'd want some css or html knowledge.

During the course it felt as if I was barely scratching the surface of this tool. And as soon as a started to dig deeper, I encountered more technical issues. Or better yet, more technically based capacities.

So while it is not technically demanding, I'm guessing you'll get more test for your buck if a technical person handles this tool.

## Honest Opinion

It is difficult not to see the value Tosca brings to the table. Quickly generating unique identifiers for webpages and different test cases is a huge plus. With Selenium and to a lesser degree Cypress this is a fairly time consuming process. The same goes for different test cases, adding and reviewing test data in code is never a fun process. Tosca does this all by itself. Yet as a tester, I feel I should be more involved in that process. Instead of review the test cases after being generated, I'd like to point the generation process in the direction I want.

And this is the case for a great number of features in Tosca. They are well done and work. But I miss the sense of control code gives me. In addition, once you do want more technical tests in Tosca the process became somewhat confusing. In terms of user experience it felt that they've hidden away the more advanced capabilities. Which reduces the value of the tool in my eyes.

In the end it leaves me with a sense of duality. It is a decent testing tool, but maybe not for me.

Enjoy and happy testing

## Sources

[Tricentis Tosca site](https://www.tricentis.com/products/automate-continuous-testing-tosca/)

[Useful youtube video](https://www.youtube.com/watch?v=f6aBpa95kLc)
