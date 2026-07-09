---
title: Cypress Accessibility
description: Exploring the Cypress Accessibility addition to the Cypress Cloud platform.
pubDate: '2023-10-10'
category: testing
tags:
  - testing
  - cypress
---

# Cypress Accessibility 

In today's digital landscape, ensuring web accessibility is not just a best practice; it's a legal and ethical imperative. Websites and applications must be usable by everyone, including individuals with disabilities. Cypress, a popular end-to-end testing framework, has stepped up to the challenge with its innovative Cypress Accessibility addition to the Cypress Cloud platform. 

**Effortless Integration with Existing Cypress Tests** 

Cypress Accessibility seamlessly integrates into your existing Cypress testing workflow. There's no need to learn new tools or rewrite your tests. Simply record your tests to Cypress Cloud, and it automatically analyzes your test artifacts to identify accessibility issues within your web pages. 

**Real-Time Insights and Actionable Feedback**

One of the most significant advantages of Cypress Accessibility is its real-time feedback mechanism. As your tests are recorded,  Cypress actively scans for accessibility violations based on established standards like WCAG (Web Content Accessibility Guidelines). It then provides you with clear, actionable feedback pinpointing the exact location and nature of each issue. This allows developers to quickly identify and rectify problems before they impact users.

**Eliminating Manual Effort and Reducing Risk**

Traditional automated accessibility testing often involves manually adding assertions to tests, which can be time-consuming and prone to human error. Cypress Accessibility automates this process, ensuring consistent and comprehensive evaluation with every test run. This not only saves valuable time and resources but also significantly reduces the risk of overlooking critical accessibility issues. 

**Empowering Teams to Prioritize Accessibility**

By seamlessly integrating accessibility testing into the development process, Cypress Accessibility empowers teams to prioritize accessibility from the very beginning. This proactive approach fosters a culture of inclusivity and ensures that accessibility considerations are woven into the fabric of the development lifecycle. 

**A Powerful Supplement, Not a Replacement**

While Cypress Accessibility is a powerful tool, it's important to note that it's designed to supplement, not replace, manual accessibility testing. Manual audits still play a crucial role in uncovering complex issues and ensuring a holistic evaluation of the user experience. 

Cypress Accessibility is a game-changer in the realm of web accessibility. Its effortless integration, real time feedback, and automation capabilities make it an invaluable asset for development teams committed to creating inclusive and accessible digital experiences. By seamlessly integrating with your existing Cypress tests, Cypress Accessibility empowers you to catch and address accessibility concerns early on, leading to websites and applications that are truly usable by everyone.

## Disclaimer

This feature is still in **early access**. And is in full development. Meaning, it will only improve over time. 

## How to implement 

Implementing this feature couldn't be easier. Providing you have access to Cypress cloud, and your license included the actual accessibility feature. If these prerequisites are in order, the feature should just work. Which is amazing. It is getting rare these days for something to just work. 

It is as simple as adding a projectId into your cypress configuration and a small addition to the run command. 
In order to record the test results, Cypress requires two new parameters to be added: the --record and -- key. This would make your command look something like this: 

```bash
npx cypress run --record --key a99b62b7-a128-4f2b-836d-7a42411d583c 
``` 

After which, Cypress will run exactly as you're used to. It might take a bit more time, as it is recording and transferring all the records to the cypress cloud. And because it is mostly a command change, the integration in even the most basic pipeline is easy. 

## The experiment 

For this experiment, a fairly small application was chosen. The application consists of four pages, each designed to be concise in terms of components and information. Two of these pages incorporate modal's that pop-up over the underlying content. These modals are usualy forms to fill in. While the pages will display the information. 

The testing framework encompasses a total of 76 distinct tests, distributed across 15 separate specification files. For this experiment the tests were run locally against the remote environment. While there are several easy pipeline integrations on offer, Cypress Cloud itself has incorporated several easy to follow guides to use github actions, gitlab, ... . 

## The results 

### The rules 

Cypress Accessibility boasts an impressive arsenal of 66 distinct rules by default, designed to meticulously evaluate the accessibility of web applications. These rules come from Axe Core by Deque Systems are thoughtfully categorized based on their severity, ranging from minor to critical, empowering developers to swiftly prioritize and address the most impactful issues first. This tiered approach proves particularly invaluable when dealing with applications riddled with accessibility shortcomings, enabling a systematic and efficient remediation process. 

The rule set encompasses a wide spectrum of accessibility considerations, encompassing everything from color contrast ratios and keyboard navigation to semantic structure and screen reader compatibility. By adhering to these well-defined guidelines, developers can ensure that their applications meet the needs of all users, regardless of their abilities or disabilities. 

### Snapshots

One of the most potent weapons in Cypress Accessibility's arsenal is its reliance on fully-hydrated DOM snapshots from the application under test. This feature, a hallmark of the Cypress testing framework, seamlessly extends to the realm of accessibility testing. Each identified rule violation is accompanied by a snapshot of the offending element, clearly highlighting the specific component that is causing the failure. 

These snapshots serve as invaluable visual aids, providing developers with a clear and concise representation of the issue at hand. By visually pinpointing the problematic element, developers can quickly grasp the nature of the violation and take immediate action to rectify it. This significantly streamlines the debugging process, eliminating the need for tedious manual inspection and guesswork allowing developers to inspect the exact application state where the violation was detected. 
Moreover, the snapshots can be easily shared among team members, fostering collaboration and ensuring that everyone is on the same page regarding the identified issues. This visual documentation also proves invaluable for tracking the progress of accessibility improvements over time, allowing developers to monitor the effectiveness of their remediation efforts. 
In essence, the combination of a comprehensive rule set and visually informative snapshots empowers development teams to proactively and efficiently address accessibility concerns, ultimately fostering a more inclusive and user-friendly digital landscape. By leveraging these powerful tools, developers can confidently deliver web applications that are not only accessible to all but also visually appealing and intuitive to navigate. 

### The violations

In the course of the experiment, the test application, despite its relatively small size, revealed a notable 8 rule violations, culminating in 11 distinct issues demanding attention. A noteworthy observation within this list is Cypress's decision to sort the violations based on the quantity of elements involved, rather than adhering strictly to severity levels. This approach, while potentially helpful in gauging the breadth of impact, can lead to a somewhat skewed perception of priority. 
For instance, in this specific scenario, the two violations at the top of the list were classified as "critical," followed by a "minor" violation, and then a "serious" one. This unconventional ordering momentarily obscured the fact that the "minor" issue could, in fact, be safely placed to the backlog due to its lesser impact on overall accessibility. This deviation from the typical prioritization based on severity, a cornerstone of IT practices, initially proved counterintuitive and required a moment of careful analysis to discern the true order of importance. Cypress mitigates this temporary confusion as any column can be used to sort the table. And the filters can hide or show any information that might be relevant for you.

Nevertheless, Cypress Accessibility provided a wealth of information to facilitate the remediation process. For each violation, a detailed report was readily available, including the precise selector pinpointing the problematic element, the specific metrics against which the rule was measured, a snapshot of the offending element in context, and supplementary information about the violated rule itself. This comprehensive report could easily be translated into actionable tasks, such as creating tickets in a project management system like Jira, complete with all the necessary details for developers to efficiently address the issues. In order to easily assign priority to each of the issues, the filters help in reducing the information overload to a more digestible level.
While the default sorting mechanism might require some adjustment in perspective, the richness of the violation reports, coupled with the actionable insights they provide, ultimately empowers development teams to effectively tackle accessibility issues and deliver a more inclusive digital experience. The ability to seamlessly integrate these reports into existing workflows, such as issue tracking systems, further streamlines the remediation process, ensuring that accessibility remains a top priority throughout the development lifecycle.

## Conclusion 

The Cypress Accessibility experiment has emerged as a resounding triumph, revolutionizing the landscape of web development. This innovative plugin seamlessly integrates into existing Cypress testing workflows, empowering development teams to proactively champion accessibility from the very beginning. By automating the validation process and providing real-time feedback, Cypress Accessibility streamlines the identification and rectification of accessibility issues, ensuring a more inclusive digital experience for all users. 
A standout feature of Cypress Accessibility lies in its plug-and-play nature, eliminating the need for tedious manual assertions or repetitive user acceptance testing. Each change or new feature introduced to an application is instantly scrutinized against a broad set of accessibility rules, enabling developers to swiftly address any violations. This automated approach not only saves valuable time and resources but also significantly reduces the risk of human error, ensuring a higher level of accuracy and consistency in identifying accessibility concerns. 

Moreover, Cypress Accessibility fosters a cultural shift within development teams, encouraging them to prioritize inclusivity as an integral part of their work. By seamlessly integrating accessibility testing into existing workflows, it promotes a proactive approach to addressing accessibility concerns from the very outset. This, in turn, leads to the creation of websites and applications that are truly usable by everyone, regardless of their abilities or disabilities. 


In conclusion, Cypress Accessibility has proven itself to be an indispensable tool for modern web development. By automating the accessibility validation process, providing real-time feedback, and fostering a proactive approach to inclusivity, this plugin empowers developers to create digital experiences that are both legally compliant and ethically sound. The experiment's results underscore the immense value that Cypress Accessibility brings to the table, making it a must-have for any development team committed to building a more inclusive and accessible digital world.

## Links
[Deque](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
