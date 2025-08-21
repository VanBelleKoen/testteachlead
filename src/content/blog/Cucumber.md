---
title: "Cucumber in BDD"
description: "A practical look at Cucumber’s role in Behavior Driven Development and real-world project experiences."
pubDate: "2025-07-31"
---

Cucumber was developed to assist testing in a Behavior Driven Development (BDD) environment. Since the primary function of BDD is facilitating the communication between business and developers. Cucumber was created to fill in the gap between business and testers.

## The Plan

Most projects will try and use Cucumber to allow Business analyst to add testing scenarios. Meaning that the stories will show some cucumber steps, which the tests should include in the automated tests. These steps are written in the Gherkin language, so they would be or should be readable for everyone.

So business analyst will start writing Gherkin in order to facilitate testing? Well, that's the plan. To paraphrase from field manual Truppenführung of Helmuth Karl Bernhard Graf von Moltke:

> No plan survives contact with the enemy.

Strangely and maybe important to note. Even cucumber advises against letting business analysts write scenarios.

> It is usually counterproductive to let product owners and business analysts write Gherkin.

Yet this has been the case for every project that I've been working with cucumber.

## Benefits

So we've established that there is a plan, but what are the advantages of using cucumber. Why do we continue to use this in so many projects?

Considering the plan, we know that cucumber and Gherkin is readable and is able to promote teamwork. These do go hand in hand, as one cannot live without the other. And as you can see this is very readable.

```
Scenario: Breaker guesses a word  
  Given the Maker has chosen a word  
  When the Breaker makes a guess
  Then the Maker is asked to score
```

Another major advantage of cucumber is the reusability of the steps. For example:

```
Scenario: Breaker guesses a number  
  Given the Maker has chosen a number  
  When the Breaker makes a number  
  Then the Maker is asked to score
```

There is no need to create a new step or even a new function in the code for the last step. As long as the code behind the step is **sufficiently** generic, the reusability will be a significant asset.

The third advantage, that I want to cover are the example tables. At the current moment we have two scenarios, with some duplicate lines. This can easily be solved using the example table. Now I have one scenario outline that will run twice. Once using the word value and once using the number value.

```
Scenario outline: Breaker guesses a <game>  
  Given the Maker has chosen a <game>  
  When the Breaker makes a guess  
  Then the Maker is asked to score

Examples:
    | game   |
    | word   |
    | number |
```

While the benefit of example tables cannot be overstated, writing code that is adapt to handle every scenario that you can think of might not be worth the gains. This will always dependent on the application and the result.

### Gherkin

Gherkin is defined as a Domain specific language, meaning that it has no other application than cucumber. With its 16 keywords, the language is simple and quick to be adopted.

While **given when then** steps are the bread and butter of Gherkin, these keywords do not really influence the code. They are created and used for readability. You could write the following and it would still work.

```
Scenario: Breaker guesses a number  
  When the Maker has chosen a number  
  When the Breaker makes a number  
  When the Maker is asked to score
```

The keywords are used to subdivide the text into prerequisites, actions and expected results. Commonly this subdivision is seen as a major advantage of cucumber, due to the increase in readability. Hench its location in the blogpost. Yet commonly seen as an advantage, does not prove that it is. On to the drawbacks...

## Drawbacks

The whole cucumber - Gherkin combination adds another layer of complexity. Suddenly besides writing generic enough functions in Java or JavaScript, the developer or testers or analyst must write steps that can be reused while being specific enough to differentiate between the scenarios.

Generic but specific enough, which does sound like a herculean task. And it is an increasily difficult task. Every time a new feature is ready for testing, all current steps have to be checked in order to see if they can be used.

This does reduce the amount of teamwork possible. Because the steps written by the analyst might require some change in order to be specific enough or to be generic enough to be reused. And we cannot expect someone not dedicated to the testing framework, to know all current available steps. Or how the code behind the step works. So now, an analyst is advising steps rather than providing them. Meaning that in the end, steps might have to be changed or discarded.

## My Humble Opinion

Cucumber is more trouble than it is worth. The major advantages are the readability and the communication between analysts and testers. And I just do not accept that those advantages are worth the trouble cucumber brings. Communication between testers and analysts is vital as a tester or any quality minded person. If you need cucumber to facilitate this, you have bigger problems.

The other advantage is the reusability of the steps. Yet keeping the steps reusable is a difficult and time-consuming task. So maybe it is just not worth the effort.

I've done several projects that were using cucumber, yet never have I seen it used beneficially.

Business have never asked me about my step definitions or anything the like. The only questions business asks is if we're ready for production.

## Sources

[Cucumber HomePage](https://cucumber.io/docs)

[Dutch Java-magazine discussing Cucumber](https://nljug.org/java-magazine/effectief-automatisch-testen-met-cucumber/?cn-reloaded=1)

[Cucumber scenario Outline](https://www.baeldung.com/cucumber-scenario-outline)
