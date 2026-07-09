---
title: Guiding principles for Test Automation
description: Essential guidelines and considerations for effective test automation in modern applications.
pubDate: '2025-07-31'
category: testing
tags:
  - testing
---

Recently, b.ignited was asked to give guidelines for automating tests. Specifically, when and what should you automate within an application. Initially, we considered this assignment to be easy. It quickly became clear that this was not the case. In fact, writing down what most of us would consider fingerspitzengefühl was one of the hardest things done.

This goes to show that while experience is invaluable, it can become a crutch if not supported with knowledge.

> "Those who know, do. Those that understand, teach." - Aristole

Most parents would agree that driving is fairly easy, but teaching someone to drive is a different challenge. The considerations or actions that come naturally to someone with experience are difficult to translate for the next generation.

So what are these considerations when discussing Test automation?

## Considerations for automation

When purchasing a car, you do not blindly purchase just any car. There is a list, spoken or unspoken, that you consider. In the case of test automation, the following list could be considered a good place to start.

1. Regression
2. Risk
3. Speed
   1. Test execution
   2. Development
4. Step-security
5. Complexity
6. Effort
7. Time to market

This list, regardless of length, can never be considered exhaustive. Different projects, different engineers might have different concerns or additional concerns; or in a wildly different order. A great deal would depend on the application under test and the engineer testing it.

But before we enter the grey zone of doubt and nuance, let us tackle the list.

### Regression

Regression testing is seen as the main benefit of test automation. So it would be a logical extension of this, to consider regression testing first. Let's assume that everyone subscribes to the ISTQB Foundation definition of regression testing, which defines it as change-related testing. So in regression testing, the engineer wants to validate whether bugs have been introduced into the application by an unrelated change. In short, has something been changed or broken that should not have been.

In this type of testing, it is necessary to validate a large part of the application again, if not the entire application. Often times, it is impossible to re-test the whole application, especially in very complex or time sensitive projects. So we pick and chose based on usage and importance to the correct flow.

In an ideal world, we'd attempt to automate everything. But as the world is far from ideal, we should focus on the important bits first. Incidently, this is great advice for life in general. Focus on the important bits, first.

### Risk

Next consideration is based on the risk the feature or functionality poses for the application and/or the organization. Any step or process that is vital for the system should be subjected to the most rigour testing. And that will almost always include test automation.

Keep in mind the flow of ordering something online. One of the first steps to accomplish this, is adding the item to your cart. If this part of the application fails, your ecommerce company might as well close up shop. Considering the huge risk the 'Add to cart' functionality poses, this feature should be added into any test automation suite. 

### Speed

A major benefit of test automation is the ability to quickly add additional tests into the test suite. Any well-architured framework enables the engineer to add multiple test cases within minutes.

While speed is always a factor in software development, we should be mindful that speed is not everything. Another quote springs to mind:

> "Don't be in such a hurry. You'll never get there alive." - Josh Billings

A nice reminder that a fast test, whether it is in execution or development, might not be a valid one.

#### Test execution

One of the major pitfalls in API testing is the fact that the test execution is so short. Quickly adding another ten tests is of no consequence in test execution. Sadly, those consequences show themselves in different parts of the process. Maintenance, for instance, any added test has to be maintained and updated throughout the life-cycle of the application. So be sure that the test you're adding is a valid and valuable one. Since you'll end up maintaining it. 

And yet, we should take heed that some tests are just not worth their run time. When working in an async environment or with an extended UI flow, the engineer should take the time to reflect the value per time.

#### Development

The same can be said for development. Regardless of whether a test can be added fast, it should still be a valid test. While some projects might take the number of tests into account, quantity should never prevail over quality. And while any well-architured framework allows the engineer to add tests in mere minutes, we should never lose sight of what we're trying to do. Which is testing the application using an automated process.

An important side note here is that data-driven testing could enable someone to write additional test cases extremely fast. With the nuance, that a great deal of time has been spent preparing all the generic code and flows to support a data-driven test.

### Step-Security

Another major benefit of test automation is the fact that each test run will be the same as the previous one. Each step is repeated without fail or inconsistency, which is something that can only be done with test automation. And this relationship between test case complexity and test automation is a strange one. Because with each increase in complexity, the effort to automate will increase together with the added value in automation.

This strange relationship between complexity and value is, one that should always be in the thought process of a test automation engineer. 

One of the more common practises in test automation is that the automation code explains how the system should work, and while this blog offers no opinion on this practise. It does illustrate the need to automate even the more complex flows of the application. There is obviously a quote for something like this.

> "Automation is the art of making simple things complex and complex things simple." - Russel Ackoff

You could interpret the quote as saying that some simplistic flows might be more effort than value. But that is for our next consideration.

### Effort

When test automation is compared with manual testing, the main catalyser of the discussion will be the return value and the speed at which this value is achieved. This forces the acknowledgment that manual testing will provide higher and faster value if a test case has a single test run.

The main difference is that with each additional test run, the value of test automation increases, while the value of manual testing will decrease. This interplay of increasing and decreasing value will cause the balance to tip in automations favour fairly quickly.

Meaning that if something shouldn't be tested in a regression set, or should only be validated once, it might not be worth the effort to automate it.

### Time to Market

The last major consideration would be the time to market. And for this one, we'd argue that it is only a consideration in the present tense. If a feature or a fix has to go to production now, it might be less effort and faster to not automate it. And just automate it in the future, with the other considerations in mind. Do be sure to log a ticket, before continuing with a manual test. Anything not written down, gets forgotten.

To be frank, any feature or hot fix that gets released with insufficient testing due to the 'Time to market' consideration should be accompanied by the following quote:

> "The only way to release software with confidence is to test it in production." - Martin Fowler

Too often, we see defects pop up in production that could have been avoided with just a little bit more time. This begs for a reference to an earlier quote about rushing and not arriving. But no text can be complete without a reference to the Romans.

> "In haste, we rush towards our destruction." - Marcus Tullius Cicero

## Conclusion

While we've tried to list several considerations, each project is unique and each test automation engineer has his or her own strengths. Even in your testing, play to those strengths. And be aware of your weaknesses. Especially in determining whether to automate a certain flow. Don't hesitate to ignore this list, and compose your own.

It is with great enthusiasm and joy that we would shout 'Automate all the things', it is with great reluctance that we add except ...

As always, happy testing.