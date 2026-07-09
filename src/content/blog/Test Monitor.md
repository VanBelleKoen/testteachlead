---
title: 'Test Monitor: A Review of Test Case Management'
description: An in-depth review of Test Monitor, its features, pros, cons, and suitability for manual testing teams.
pubDate: '2025-07-31'
category: testing
tags:
  - testing
---

*Test case management simplified*

## First Impressions

Recently a great deal of fuss has been made regarding Test Monitor. So let's check it out.

On the surface Test Monitor is a visually pleasing reporting tool, with test case management build in. When looking a bit deeper, TM is showing itself as a full equipped test management tool and not just test case management.

It allows the users to define requirements, test cases, test runs, test plans and much more. All this while creating clear and informative graphs. So why isn't everyone using this ?

### Test Cases

It would be fitting to start the evaluation of a Test Case Management tool with the implementation of it's Test Cases. It quickly becomes apparent that the Test Cases have everything you could possibly need. One very minor annoyance is the fact that test steps are called instructions. Deviation from any naming convention is just asking for confusion.

One of the test case features that I like is the link towards risks. It it possible to create a risk and link that specific risk to multiple test cases. This would enable and facilitate risk communication towards management, which is always an hurdle to do in any project.

On a sadder note, I was unable to get the import test cases to work out of the box. This because the importer expects my excel file to have instructions, which it obviously does not have since any other tool uses test steps. After some fiddling in the excel, I was able to import the excel.

### Reporting

Let's be honest, the graphs are clear, informative and visually nice. The reporting is great. Yet, something is missing. Being unable to mark which instruction step caused the failure seems as a massive oversight. Different test case management tools would show which test step failed in both the test run and the created issue. To be frank, this has to be on the roadmap in order for me to even consider this tool.

The whole point of a Test Case management/Reporting tool is facilitate communication between both the tester, the developers and the managers. Lacking a option to mark where the test case fails significantly decrease the communication value for both testers and developers.

On the other hand, the fact that the reporting graphs and views are customizable is a massive bonus for managers and QA leads. This would enable them to focus on whatever metric they find important.

### Second Impression

Test Monitor is a decent tool with some obvious missing components. So maybe those missing features are on the roadmap. Maybe they will add them in the very near future. A quick glance at the roadmap shows that this is not the case.

At it's current state I wouldn't implement the tool. Not just because of the complains listed above. For me a Test case managent tool is all about communication and facilitation. And while Test Monitor is a perfectly servicable tool, there are multiple others that would serve the same purpose better.

In it's current form I would advise manual testing teams to adopt the tool. Mostly because the focus lies on test cases and reporting to managers. As soon as the project hinges on communcation with developers this tool won't be a good fit. Why manual testers ?

Because in automation we are often forced/asked to use cucumber which TM does not support at the moment. Granted, it is possible to use code and modify the feature file when implementing an automated solution. But other tools support this out of the box, which is cheaper to implement.

Below a nice overview of which pro's and cons I did find.

## Pro's and Cons Table

 | Pro                     | Con                                 |
 | ----------------------- | ----------------------------------- |
 | API Documentation       | No test step failure                |
 | Reporting               | Reverse Jira integration            |
 | Manual testing          | Weak roadmap                        |
 | Great waterfall support | No cucumber integration             |
 | Define requirements     | Multiple tools                      |
 | Focused on managers     | Unsuited for automation             |
 | -                       | Complicates communication           |
 | -                       | Attempts to replace Jira/confluence |
 | -                       | Terrible test case import           |

## Sources

  - [Test Monitor home](https://www.testmonitor.com/?hsLang=en)
  - [API documentation](https://docs.testmonitor.com/)
  - [Roadmap](https://www.testmonitor.com/roadmap)
