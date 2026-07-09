---
title: 'From VSCode to Neovim: A Journey of Control and Customization'
description: A personal journey from mastering Vim motions in VSCode to embracing the power of Neovim.
pubDate: '2025-07-31'
category: developer-tooling
tags:
  - developer-tooling
  - editors
---

In my previous post, I explored mastering Vim motions, a key part of enhancing productivity and efficiency. But my journey didn’t stop there. After getting comfortable with Vim motions in VSCode, I decided it was time to take things to the next level: migrating to NeoVim. However, this transition wasn't as smooth as I had hoped.

## Neovim: The first time

Installing Neovim for the first time was an interesting experience, and a great lesson in Murphy's law.

> Anything that can go wrong, will go wrong.

And everything did go wrong. I jumped in half-assed and messed up. I didn't read the documentation, I got frustrated when nothing worked out of the box. You could ask some questions about my expectations when I started this journey. The experience was humbling and frustrating. Neovim defeated me without even trying.

But I was resolved to keep working in a Vim oriented environment.

## AstroVim: The Halfway Point

At first glance, AstroVim seemed perfect. It offered the promise of Neovim's power but with the comfort of VSCode’s UI. But it didn’t take long before I started feeling that I was missing something—the “real” Neovim experience. AstroVim wrapped things too tightly, making it difficult to customize in the way I wanted. Worse yet, I encountered bizarre behaviour: typing words with “ijk” (common in the Dutch language) became impossible, throwing a major wrench into my workflow. It was clear that AstroVim wasn’t the solution I was looking for.

## The Leap to Neovim

Frustrated but undeterred, I decided to go for Neovim again. I knew that if I wanted full control over my development environment, I needed help. I required a guide, something to hold on to. Enter the **Kickstarter-Modular setup**.

### Kickstarting Neovim with a Modular Setup

The kickstarter-modular approach as designed by dam9000 allowed me to set up a `minimal` Neovim environment and layer in plugins piece by piece. Unlike the pre-configured AstroVim, this gave me more control over every aspect of my IDE. I could now tweak and adjust my settings, experiment with different plugins, and slowly build an environment that matched my workflow perfectly. But the kickstarter did so much that I lost focus.

I needed to take a step back and figure out Neovim before I started installing anything. So I went to the research, otherwise known as google.

The Neovim documentation was great, especially with resources such as the YouTube video of TJ Devries as linked below. And with a better understanding, I started defining my configuration. I took the time to figure out what it all meant and how it was supposed to work.

#### Tweaking My Setup: Finding Balance

This phase wasn’t without its challenges. Customizing Neovim is both empowering and frustrating—empowering because of the flexibility, frustrating because of the learning curve. I spent a lot of time tweaking settings, adjusting plugins, and resolving conflicts. But after many iterations, I started to feel confident. Neovim was no longer a mysterious black box. It was my development environment, and I was in control.

#### Conclusion: A Developer’s Environment Is Their Own

The journey from VSCode to Neovim taught me that your IDE is not just a tool: it’s an extension of your workflow. Customizing Neovim from scratch has made me a more productive developer and gave me full control over my environment, allowing me to shape it according to my needs.

If you're on the fence about making the switch, don’t be afraid of the initial complexity. The freedom and control you’ll gain are well worth the effort.

### Links

[AstroVim](https://astronvim.com/)

[Neovim](https://neovim.io/)

[Kickstarter modular approach](https://github.com/dam9000/kickstart-modular.nvim)

[Neovim configuration tutorial of TJ Devries](https://www.youtube.com/watch?v=m8C0Cq9Uv9o&t)
