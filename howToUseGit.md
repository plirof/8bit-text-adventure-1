Welcome to the Git Tutorial
===========================
I will be showing you how to effectively use git for github.
**I found a really good tutorial from the folks over at code school which explains almost everything here much better than I can.** So click [ here ]( http://www.youtube.com/watch?v=ltzQbZrWLds ) to see it. 

**What is Git?**  
Git is an older, command line tool that has now become more widely used due to the more recent creation of GitHub. You can think of it as a localised version of github, i.e the repositories are stored on your computer and nobody else can see or access them. It acts as a version control so if you mess up some file or you accidentally delete it then you can go back to a way that it was before. You can use it to make changes locally and then push them to github if you so wish. All the same basic actions on github are available locally via git, for example branches and commits. You should note that pulling on github is basically the opposite of pulling on git, but we will get into that some more later. For now, we will focus on installing git and I will explain more as we go along. 

**Installing Git**  
Git is fairly easy to install. There are no prerequesites but there are many different ways to install git depending on which OS you are using. I'm assuming none of you are using linux.  
**Mac:** Use the very simple git installer from [here] (http://code.google.com/p/git-osx-installer "Git Mac installer"). Just follow the installer and skip to the next step when you are done!  
**Windows:** Again, use the simple installer. It can be found [here] (http://msysgit.github.com/ "Git windows installer"). During install you might be asked if you want to install the git bash (basically another command line that only works with git commands). I would strongly recommend this option because if you use git from the normal windows command line it is slightly irregular and you might have some trouble following along with some commands in this or other tutorials. After that open up the git bash which should have an orange diamond symbol. You will be prompted for input whenever you see a `$` on the screen, don't type unless this symbol precedes the cursor.

**Setting up the config files**  
The first thing you need to do when you setup git is add your name and email to the git config file. To do this, you will need to run the following commands in the terminal if you are on mac or git bash if you are on windows (I will refer to it just as cmd from now on):
```
$ git config --global user.name "Your name here"  
$ git config --global user.email bacon@example.com
```  
At this point, I also suggest making a shortcut to the `checkout` command so we can just type `co` instead, but this tutorial will use the `checkout` command just for clarity. To do this, type `$ git config --global alias.co checkout`  

**Initializing a repository**  
A repository on git is a lot like a repository on github. It is a cache of files which make up a project. In git, the repositories are the places where you can execute all your commands, so outside of a repository you cannot do much at all. A repository is stored in a single folder and any sub-folders or files are controlled by git. So if we had a folder called bacon and another one inside that called sandwich, if we made our bacon folder into a repository any files in the bacon folder as well as any files in the sandwich folder would be included in the repository. Now we will actually create one ourselves. For this you will need some basic  command line knowledge on how to navigate and make directories using `cd` and `mkdir`. Note that all commands in git start with the word 'git'. We will create our first repository (repo for short) in the folder `C:\gitstuff\firstRepo`. This can be anywhere you want but I suggest that you have some sort of master folder to store all your git projects in, which in our case will be the 'gitstuff' folder. To create these, navigate to your `C:\` folder (or wherever you want it to be) and type: `mkdir gitstuff`. Then, go inside that with `cd gitstuff` and make a new folder again with `mkdir firstRepo`. Of course it is possible to go into a file browser and create a folder like that, but seeing as we will need to be in the 'firstRepo' folder in the command line anyway, it would save us the trouble of opening up the file browser. So now we are in the 'firstRepo' folder we can initialise the repo (we only need to do this once). Type `git init` for this to happen. Move onto the next step when you feel ready.

**Adding and Commiting Files Locally**  
You can think of these two actions being similar to getting in and out of a car, each person represents something that has been added, and the commit is when the car drives away and there is nothing else to be added. Adding is basically putting changes in a file to a staging area, where the commit is a finalised action where all the files in the staging area are now archived. If you make a change to a file you can use the add command to add it to the staging area, make some more changes to other files and add them as well, but when you are ready you commit it. We are now going to make a file called `bacon.txt` and type whatever you want in there. Make sure that when you are done you save the file into `C:\gitstuff\firstRepo` or wherever you put the `firstRepo` folder. Once you have done that navigate inside the 'firstRepo' folder using the command line. To add it to the staging area, type `git add bacon.txt`. I will now show you a command that tells you the status of everything that has been added, removed or has been changed but not added since the last commit you made. This command is `git status`. Type that in now. You should see that our `bacon.txt` file has been added to the staging area. If we hadn't run the add command to `bacon.txt` then running the status command would have told us that changes have been made but we haven't staged them. Now, we will commit the change. Type `git commit -m "Message goes here!"`. The `git commit` part tells git that we want to commit all staged files, and the `-m` part (these things are known as flags, similar to parameters in programming) tells git that the next string it sees it the commit message. It can be anything you want but I suggest you keep it relevant, so in our case we could say "Added bacon.txt". This is required by git so if you left out the `-m` it would open up a text editor in the command line for you to type a message in. Now we are done with the commit, run the status command again and see that there are no more changes to be staged. Play around with this a bit - change the contents of our bacon file and repeat that exact same process. Move onto the next step when you are ready.

**More about commits**  
When adding files to the staging area, there is a shortcut that you can use that tells git you want to add *everything* to the staging area (that has been changed). This is the `.`. So the command `git add .` would add all files in that directory along with everything in all other subdirectories. There is a much quicker way to do this without even having to use the `git add` command. You remember the `-m` 'flag' I told you about? Well I will teach you another, the `-a` flag. If you use that then it is in effect the same as using `git add .`. But instead of typing `git commit -a -m "Message"` you can use the `-am` flag which is both of them combined. So to commit everything it would be: `git commit -am "Message"`. Be careful, because when you use the `-a` flag it *ignores any new files or any renamed files* since the last commit. So for those you would need to add them manually.

**Branches**  
A branch is, again similar to that on github - you usually have master branch and you can create others to effectively make a copy of the master and experiment with it a bit, so if you mess up you can delete the branch, make a new one and start again without ruining any of the files in the master branch. If you are using the git bash on windows, you will notice that as soon as you typed the `git init` command in the folder, a little `(master)` appeared next to your file path. This, as you might have already guessed, shows the user the current branch they are on. If you are not using the git bash then you will have to use the following command: `git branch`. If you type it in now, you should see a 'master' branch and a star to the left of it. The star indicates the current branch, and if you had created any other branches then they would appear in that list *without* a star (unless you are currently on that branch, of course). Now we will go ahead and make a new branch. To do this, type: `git checkout -b secondary-branch`. This creates (`-b`) a branch called `secondary-branch` in the current repo. If you had made the shortcut to `checkout` before, you could have just typed `co` but as I said, I will use the full command just for clarity. Note also that the command above both creates a branch and then switches into it so we won't have to switch to it ourselves. Now we have created it we will make a change. Make a new file in the `firstRepo` folder and call it `readme.md`. This will be useful for us later when we push to github, because by default github displays the readme file on the homepage (as you can see from our project). The `.md` extension is the 'markdown' language, which is what I am using now to make this text look pretty. For now, just type in '==Welcome!==' just like that. That's basically a header for our file. Then save the file and go back to the cmd line. We are now going to commit the change with `git commit -am "Made a readme"`. Once you have done that, the next thing is to merge the experimental 'secondary-branch' into the 'master' branch. We must now switch back to the 'master' branch, so type: `git checkout master` to change to the 'master' (We can use this to change back and forth if we type `secondary-branch` instead of `master`). To actually merge it you will need to type: `git merge secondary-branch`. We don't need to type the target branch because git assumes that we want to merge with the branch we are currently in. To tidy everything up, we will delete the branch with `git branch -d secondary-branch`. 

**Adding a remote repo**  
As I mentioned briefly at the beginning of the tutorial, a push in git is basically the same as a pull request in github - they both end up changing the code. You can think about it like this - in github, you are submitting a pull request because you are asking the owner of the repo to 'pull' a branch into their repo. In git, you are simply pushing code up to the remote repo and there is no human authentication required. *IMPORTANT!* A push can only be done to a repo that *YOU OWN*. A pull request is done purely from github to github repository, and you can only do it to other people's repos. So however the same they seem at first glance, they are fairly different. Anyway, down to business. To connect a local git repository with a github repository you will first need to make a repo using your github account. If you are already logged in, go to the github homepage and click the green button in the bottom-right and follow the steps. Remember the name you gave to the repo as you will not be able to connect with out it. Now, ope up your command line and type in this: `git remote add origin git://github.com/USERNAME/REPO-NAME.git`. Replace the `USERNAME` with your github username, and `REPO-NAME` with the name of the repo. *Note:* The `.git` extension is very important and git will complain if you don't add this. Basically, what this line of code does is adds a 'remote' repository with the name of 'origin' (you should always name your remote repo's origin unless you have to) with the target url you have specified. At this point if you get a `Access denied (publickey)` error then contact me and I will help you fix it. 

**Pushing to Github**
Pushing to github is quite simple - use the following command:
```
git push origin master
```
The `git push` part tells git that we are going to push to our remote repo named `origin` with the branch of `master` (master is the default git branch). At this point you will usually be required to authenticate so enter your git account details and it should successfully upload all your commits to the remote. Contact me if you get any errors.

**Pulling from Github and merge conflicts**
Pulling can cause quite a few problems, namely merge conflicts. Merge conflicts are where you try and merge two files into one where both the files have changed the same part. Bear in mind that if you have commited before you pull then these conflicts will not arise. I will show you an example of a merge conflict. First, go into github's website and change the file `bacon.txt` on line 1 so it says "This is from github". Next, go into the local version of the `bacon.txt` (i.e the one in git) and change line 1 so it says "This is from git". Now, if you try pulling the changes from github into your local repo with `git pull origin master` and open up the file `bacon.txt` you should see something has changed. There file should look something like this:
```
>>as62jch89
This is from github
====================
This is from git
>>au72jam01
```
The random gibberish will change from system to system so ignore that. Basically, git has detected that two files have changed one line. It displays the changes and you will have to fix them manually. So, if we want to keep what github says then we would delete everything between the two `>>`'s (inclusive) so all that is left is `This is from github` in the file (along with anything else you put in the file not related to the merge conflict). Similarly, delete everything apart from the `This is from git` if you want to keep the git part.

**Creating a repository workflow**  
This will go through the steps necessary to setup a git repository and connect it to a github repo.

First, we will make a new folder in our gitstuff folder and initialize the git repository:
```
cd ~/gitstuff
mkdir testRepo
git init
```
Next, go into github and create a repo. For the purposes of this tutorial we will call ours testRepo. Go back into your command line and type:
```
git remote add origin git://github.com/yebudar/testRepo.git
```
All done! You are ready to use git.

**Add, commit and push workflow**
Ok, create a file in our `testRepo` folder. We will call it `workflow.txt`. Add whatever text you want into it, and then go into the command line and type:
```
git add .
git commit -m "Create workflow.txt"
```
Ok, now to push to github:
```
git push origin master
```
Done!

**Reference section**
Coming soon
