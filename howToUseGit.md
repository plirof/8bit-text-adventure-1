Welcome to the Git Tutorial
===========================
I will be showing you how to effectively use git for github.

**What is Git?**  
Git is an older, command line tool that has now become more widely used due to the more recent creation of GitHub. You can think of it as a localised version of github, i.e the repositories are stored on your computer and nobody else can see or access them. It acts as a version control so if you mess up some file or you accidentally delete it then you can go back to a way that it was before. You can use it to make changes locally and then push them to github if you so wish. All the same basic actions on github are available locally via git, for example branches and commits. You should note that pulling on github is basically the opposite of pulling on git, but we will get into that some more later. For now, we will focus on installing git and I will explain more as we go along. 

**Installing Git**  
Git is fairly easy to install. There are no prerequesites but there are many different ways to install git depending on which OS you are using. I'm assuming none of you are using linux.  
**Mac:** Use the very simple git installer from [here] (http://code.google.com/p/git-osx-installer "Git Mac installer"). Just follow the installer and skip to the next step when you are done!  
**Windows:** Again, use the simple installer. It can be found [here] (http://msysgit.github.com/ "Git windows installer"). During install you might be asked if you want to install the git bash (basically another command line that only works with git commands). I would strongly recommend this option because if you use git from the normal windows command line it is slightly irregular and you might have some trouble following along with some commands in this or other tutorials. After that open up the git bash which should have an orange diamond symbol. You will be prompted for input whenever you see a `$` on the screen, don't type unless this symbol precedes the cursor.

**Setting up the config files**  
The first thing you need to do when you setup git is add your name and email to the git config file. To do this, you will need to run the following commands:  
`$ git config --global user.name "Your name here"  
$ git config --global user.email bacon@example.com`  



