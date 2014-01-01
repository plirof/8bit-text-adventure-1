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
The first thing you need to do when you setup git is add your name and email to the git config file. To do this, you will need to run the following commands in the terminal if you are on mac or git bash if you are on windows (I will refer to it just as cmd from now on):   
`$ git config --global user.name "Your name here"`  
`$ git config --global user.email bacon@example.com`  
At this point, I also suggest making a shortcut to the `checkout` command so we can just type `co` instead, but this tutorial will use the `checkout` command just for clarity. To do this, type `$ git config --global alias.co checkout`  

**Initializing a repository**  
A repository on git is a lot like a repository on github. It is a cache of files which make up a project. In git, the repositories are the places where you can execute all your commands, so outside of a repository you cannot do much at all. A repository is stored in a single folder and any sub-folders or files are controlled by git. So if we had a folder called bacon and another one inside that called sandwich, if we made our bacon folder into a repository any files in the bacon folder as well as any files in the sandwich folder would be included in the repository. Now we will actually create one ourselves. For this you will need some basic  command line knowledge on how to navigate and make directories using `cd` and `mkdir`. Note that all commands in git start with the word 'git'. We will create our first repository (repo for short) in the folder `C:\gitstuff\firstRepo`. This can be anywhere you want but I suggest that you have some sort of master folder to store all your git projects in, which in our case will be the 'gitstuff' folder. To create these, navigate to your `C:\` folder (or wherever you want it to be) and type: `mkdir gitstuff`. Then, go inside that with `cd gitstuff` and make a new folder again with `mkdir firstRepo`. Of course it is possible to go into a file browser and create a folder like that, but seeing as we will need to be in the 'firstRepo' folder in the command line anyway, it would save us the trouble of opening up the file browser. So now we are in the 'firstRepo' folder we can initialise the repo (we only need to do this once). Type `git init` for this to happen. Move onto the next step when you feel ready.

**Adding and Commiting Files Locally**  


