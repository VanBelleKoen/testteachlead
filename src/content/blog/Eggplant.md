---
title: "Eggplant Test Automation Review"
description: "An in-depth look at the Eggplant test automation tool, its features, advantages, and limitations."
pubDate: "2023-10-10"
---

An image based test automation tool powered by machine learning and AI. Is this a collect of the latest buzzwords or a powerful testing tool? Let's take a look at the word separately before making up our mind.

## Image Recognition

Lets start with some basic advice that eggplant gives us. This is taken from a youtube video published on 28th of march. As always, source is down below. During the video eggplant explains how the images recognition works and what you should look for.

I do find some issues with an image based testing software. It's difficult to tell how much an image can be distorted by resizing, before it cannot be found anymore. The dependency on backgrounds will either break your tests often or place restrictions on the development team. I'd be worried if my company would want to implement a Christmas theme. If the background changes, all my tests will fail. Should I change all the images or do I disable all the tests during that period?

One other concern I had was how it would handle duplicate images, for instance, check-boxes. But using features as defining the search field or adding a context field should mitigate the issue perfectly. It still isn't as good as a unique element but it is serviceable.

One more neat feature for the images, is that fact that you can specify on which button to click in relation to the image itself. So I could capture an image of the text next to the text-box and using the action point to type into the text-box.

For more advanced users, the search algorithm can be set in order to be more precises or smoother. Another possibility is editing the images, while the tools are very basic it does provide a certain degree of photoshop to eliminate some background colors or text borders.

## UI and UIX

People of eggplant, 1990 called they want there UI theme back. It amazing how a modern tool has such an outdated UI. It makes the tool look old and unwieldy, which I'm sure isn't the intention of the developers. But some modernization might be in order here. It must be said that the UI is very clear and easy to navigate. If compared with katalon or tricentis this is day and night.

## Scripting Language

One of the main issues I have with this testing tool is that it uses it's own scripting language. Granted the language is quite easy and straight-forward it does add another layer of complexity. While this might not faze most automators, it is something that should be taken in account. Especially if the size of the community does not increase over the years.

## Machine Learning and AI

This is where the tool is suppose to shine. After defining all the different test scenario's and different test cases, the tool will monitor each run and will attempt to arrive at the same position using different paths. This would make verification and bugs hunting a great deal easier. As now the tool will log the exact path that causes the bugs. It will no longer be, that screen when doing that. It will reflect every step from the beginning till the bug without any additional interaction from the tester. No more, "but I can't reproduce it on my machine" from the developers.

Additionally we could let the AI generate the different test scenario's based on the user interactions. This would guaranty the coverage of the application as the tool will monitor and adjust as needed. It becomes easier to see which items do not have tests or are covered poorly.

## Community

It has to be pointed out that most informative video's on youtube about eggplant are created by eggplant itself. While this is good practice, it shows that the wider QA/Tester community hasn't adopted the tool yet. This is something to keep in mind when starting to use this tool. When running into issue, there is hardly any community to fall back on. This is mostly mitigated by the fact that it's a simple enough tool to use. Yet, one should always be careful when a tool has low community coverage. There is a reason for it, maybe I wasn't able to find the reason or they need a better marketing team.

## Certification

One thing that should be noted here is that the first certifications are quite easy and free to do. They offer the courses on their site. This does again increase the usability of the application and how quickly a team could integrate the tool.

## Conclusion

I have some doubts and misgivings about the tool. The image recognition strikes me as something incredibly powerful but lacks versatility. More dynamically based website as you'd have now, make automation significantly more difficult and eggplant might not be the answer. In fact, I would worry about the automating a highly dynamic site with this tool. But a more static website, like a back-office tool would definitely be feasible. In that case, it would even be a competitor for cypress in my view.

The different scripting language is feels like they added extra complexity without a real benefit. The language isn't sufficiently easy to merit it's implementation. So I'm unsure why they took this step.

The AI and machine learning is a huge advantage. It cannot be understated that having a tool which monitors and adapts to the test coverage is a selling point.

So for me this is a highly useful tool but fairly project specific. The "restriction" towards dynamic generated websites is one that the tester should be aware off.

## Sources

[Eggplant](https://www.eggplantsoftware.com/)

[Image recognition](https://www.youtube.com/watch?v=nX2X3HuApeM)
