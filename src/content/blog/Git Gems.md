---
title: The Git Gems You're Probably Not Using (But Should Be)
description: Discover powerful yet underused Git commands to improve your workflow.
pubDate: '2023-10-10'
category: developer-tooling
tags:
  - developer-tooling
  - git
---

Git is one of the most powerful tools in a developer’s toolbox—but even seasoned users often only scratch the surface. We all know the basics: `commit`, `branch`, `merge`, `rebase`, `stash`. But there’s a treasure trove of lesser-known Git commands that can dramatically improve your workflow—if you know they exist.

In this post, we’ll shine a spotlight on a few powerful yet underused Git functions. These aren't necessarily complex—they're just hidden in plain sight. By the end, you’ll walk away with practical knowledge and clear recommendations for when to use them.

---

## 1. `git bisect`: Binary Search Your Bugs Away

### What It Does

`git bisect` helps you find the exact commit that introduced a bug by performing a binary search between a "good" commit (where the bug wasn't present) and a "bad" one (where it was). Git automatically checks out commits in the middle of the range, and you mark them as either "good" or "bad". This narrows down the culprit in log₂(n) steps.

### When to Use

* You're debugging a regression.
* The bug was introduced sometime in the past, but you're unsure when.
* Manual inspection or log-based searching feels like finding a needle in a haystack.

### How to Use

```bash
git bisect start
git bisect bad                   # current commit has the bug
git bisect good abc1234          # known good commit

# Git checks out a commit in between.
# You test, then mark:
git bisect good | git bisect bad

# Repeat until Git tells you the offending commit.
git bisect reset                 # return to original state
```

### Pro Tip

You can automate `git bisect` if you have a test or script that returns 0 on success and non-zero on failure:

```bash
git bisect run ./run-tests.sh
```

---

## 2. `git worktree`: Multiple Working Directories, One Repo

### What It Does

`git worktree` allows you to check out multiple branches at the same time in different directories—all linked to the same repository. No more stashing or committing just to switch branches.

### When to Use

* You're working on a long-running feature and need to hotfix something on `main`.
* You want to compare two branches without constantly switching back and forth.
* You're reviewing PRs locally while still working on your own feature.

### How to Use

```bash
git worktree add ../feature-x feature-x
```

This creates a new folder (`../feature-x`) with the contents of the `feature-x` branch. You can now work in two branches in parallel.

### Pro Tip

Use `git worktree list` to view active worktrees, and `git worktree remove` when you're done.

---

## 3. `git reflog`: Your Safety Net

### What It Does

`git reflog` tracks where your HEAD and branches have been—even across rebases, resets, and deletes. It's your undo button when you think all is lost.

### When to Use

* You accidentally deleted a branch or did a hard reset.
* You lost commits after a botched rebase or merge.
* You're not sure what happened, but something's off.

### How to Use

```bash
git reflog
# Find the commit hash of the state you want
git checkout abc1234
# Or reset your branch to it:
git reset --hard abc1234
```

### Pro Tip

This works even if you've done a destructive operation—as long as it was recent. Reflogs are kept for 90 days by default.

---

## 4. `git stash --patch`: Selective Stashing

### What It Does

We all use `git stash`, but did you know you can stash only parts of a file? `--patch` lets you choose which changes to stash interactively.

### When to Use

* You want to stash only certain changes, not the whole file.
* You're halfway through editing a file and want to commit just part of it.
* You made changes you’re unsure about and want to keep experimenting with other changes in the meantime.

### How to Use

```bash
git stash --patch
```

This will let you stage changes interactively—like `git add -p`.

---

## 5. `git cherry`: What's Different?

### What It Does

`git cherry` shows which commits from your current branch are not in the upstream branch—without all the extra noise from merges.

### When to Use

* You're preparing a rebase or squash and want to know what’s unique to your branch.
* You're comparing your feature branch to the base branch.
* You’re maintaining a backport or release branch.

### How to Use

```bash
git cherry main
```

Each line shows a commit. A `+` means it’s not in `main`. A `-` means a commit with the same patch already exists upstream.

---

## Final Thoughts

These Git features aren’t secret—just overlooked. They’re not complex, but they solve real-world problems with surprising elegance. Next time you’re debugging, multitasking, or managing code changes, reach for one of these tools. They might just become your new favorites.

### TL;DR: When to Use What

| Command        | Use Case                             |
| -------------- | ------------------------------------ |
| `git bisect`   | Find which commit introduced a bug   |
| `git worktree` | Work on multiple branches at once    |
| `git reflog`   | Recover lost commits                 |
| `git stash -p` | Selectively stash changes            |
| `git cherry`   | Compare what’s unique in your branch |

---

Got any lesser-known Git commands that saved your day? Share them in the comments—we’d love to hear your tips.

---

Would you like help adding illustrations, CLI outputs, or real-world use cases for these commands?
