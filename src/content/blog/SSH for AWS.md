---
title: SSH Key Management for Multiple AWS Accounts
description: A guide on managing SSH keys for multiple AWS accounts, including key generation, configuration, and usage.
pubDate: '2023-10-10'
category: testing
tags:
  - testing
---

## SSH Key Management

Most people will use one, maybe two, different SSH keys. And most of the time these keys will connect to different applications. One towards GitLab and another towards AWS. But what happens when you need two different SSH keys for the same platform, specifically AWS ? I stumbled onto this problem myself when starting to use AWS at home and professionally. I constantly ran into SSH problem when switching CodeCommit repositories.

We'll solve that problem in this blog.

## What is SSH ?

According to my favorite source, SSH has the following definition:

> SSH uses public-key cryptography to authenticate the remote computer and allow it to authenticate the user, if necessary.

This of course explains everything. And I'm free to move on to the next section...

In more simple terms, SSH is a more secure way to communicate with a remote computer while being certain of the identity of that remote system and ensuring the integrity of your message. You'll find that SSH is most often used in order to connect with remote servers or to access git repositories. But how does it do that ?

We often compare the internet with the real world. It makes explaining IP addresses and certain communication protocols easier. So let us continue in this proud tradition. And compare SSH with the basic postal service flow.

SSH can be compared with protocols like HTTPS. So in this case, we add complexity to the life of the postman and our own. We, as the client, will walk up to the postman, demanding to see some identification from which the letter came. In SSH the client will initiate the connection, followed by the server verifying its identity. So far, we know that we're going to receive a message from someone specific. And not a message from a random stranger.

Next would be transferring the message. This is the easy part as there is no difference. The nosy postman just complains that the message is complete gibberish and he couldn't make sense of it. And that's another security measure that SSH introduces. In order to read the message, you'd need a decoding booklet. Or in other terms the public and private key pair that was generated between your friend and yourself. Without this, nobody can read the message. So even if the message was intercepted, it is useless.

While I'm aware that this is a gross simplification of the concept of SSH, for the purpose of this blogpost it is sufficient.

## Key Generation

So we should go ahead and generate a public and private key to use. Assuming that this will be your first keypair, we'd best start by making the correct directory. The SSH protocol will always check the .ssh folder for the keys. Meaning that we should create this folder. First we should navigate to the home directory in a terminal. The first command will bring you towards `c:/Users/[UserName]`. This is where we'll create our hidden folder to store the keypair. The next command will take care of that for us. And with the third command we navigate into that folder. Now onto the magic.

```cmd
cd ~
mkdir .ssh
cd .ssh
ssh-keygen
```

When you've entered the final command, you'll be asked to `Enter file in which to save the key`. Here the next section of naming conventions will be invaluable. After you've entered a valid and descriptive name, a passphrase can be entered. This passphrase is comparable with a password that will lock access to your private key. For now, we will ignore this. Just press enter twice in order to give an empty passphrase.

If everything went as expected, you should have something resembling this on screen.

```cmd
 +---[RSA 2048]----+
 |*= =+.           |
 |O*=.B            |
 |+*o* +           |
 |o +o.  .         |
 | ooo  + S        |
 | .o.ooo* o       |
 |  .+o+*oo .      |
 |   .=+..         |
 |   Eo            |
 +----[SHA256]-----+
```

Now you can upload the contents of the `.pub` file into whatever application you're generating this key for.

Now you have a valid SSH config for this specific application. Hurray... Time to add some complexity.

### Naming Options

While there are no real naming conventions for SSH key's. I find it helpful to use the following setup. The key should start with the application that will interact with it, so aws, bitbucket, github or gitlab would be a valid start. Next would be the name of the project or client. If my project name would be deathstar, my keyname would be aws_deathstar.pub.

As soon as you have two different keys for the same application, you'll be thankful for the projectname suffix.

## Config

Time to move on towards the config file. In order to access CodeCommit on two different AWS accounts it becomes vital to have a config file. Open a trusty notepad++ or just notepad and we should start adding the following:

```text
Host aws.deathstar
    HostName git-codecommit.eu-west-1.amazonaws.com
    User [CodeCommit UserId]
    IdentityFile ~/.ssh/aws_deathstar
    
Host aws.personal
    HostName git-codecommit.eu-west-1.amazonaws.com
    User [CodeCommit UserId]
    IdentityFile ~/.ssh/aws_personal
```

Each host will correspond with a specific AWS CodeCommit and match it's SSH key. This is where the value of naming conventions is already showing. Pay extra attention to the CodeCommit UserId, this is the accessKey as mention on the CodeCommit credential page.

The file should be stored inside the .ssh folder and have no extension.

## Git

When using a config such as the one just configured, you'll have to change the url on the first git clone command. This in order to instruct the SSH configuration to use the correct key pair. Failing to do this will most likely result in an access denied.

```console
git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/deathstar_plans
```

Change the above command into the command below. This will ensure that the correct SSH keypair is used in the connection.

```console
git clone ssh://aws.deathstar/v1/repos/deathstar_plans
```

If you already have repositories cloned, you'll have to change the remote url in the git config itself. After that bob's your uncle.

## Sources

[SSH academy](https://www.ssh.com/academy/ssh/protocol)

[SSH wikipedia](https://en.wikipedia.org/wiki/Secure_Shell_Protocol)

[Multiple AWS Config](https://gist.github.com/justinpawela/3a7056cd592d688425e59de2ef6f1da0)

[Config values to git commands](https://stackoverflow.com/questions/14689788/multiple-github-accounts-what-values-for-host-in-ssh-config)
