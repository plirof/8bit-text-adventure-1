function moveToCave() {
						var newUserRaw = getInput();
                        user = newUserRaw.toLowerCase();
                        addTextNoLast(user);
            //Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
    if (user.slice(0,5) === "drop ") {
        remItem(user.slice(5));
    } else {
        //Else, does all the other checks to see what the user has typed.
        switch(user){
            case 'help':
				printHelp();
            break;
			case "fight wolf":
				fight(wolf, 10, screwdriver)
			
				timeCheck();
			break;
			case "**CASE2**":
			
				timeCheck();
			break;
			case "**CASE3**":
			
				timeCheck();
			break;
			case "look around":
				addText("Just inside the entrance, you wait until your eyes begin to adjust to the darkness. You breath in the stale, damp air and hear a drip, drip, drip deeper into the cave. Your heartbeat increases to match the tempo. As you begin to make out faint shadows of rocks and pillars, you experience a deathly shiver down your spine as one of the shadowy rocks near you begins to growl. The shadowy form beings to move and you realise you've stumbled into a wolf's den. The wolf is NOT happy!");
				addText("You now have two options. You can either face and FIGHT WOLF, or try to flee and move to home, knowing that the wolf might decide to chase you down for easy meat whilst your back is turned.")
				timeCheck();
			break;
			//Static case statements
			case "jump":
				addText("You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.");
				timeCheck();
			break;
			case "show inv":
            	printInv();
            break;
			case "clear":
				//Empties the main div and prints lastKnown text
				$("#main").empty();
				addTextNoLast(lastText);
			break;
            case "quit":
                //Calls printGameOver() and then and exits the function. (using return makes the rest of the function unreachable)
                printGameOver();
				addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
                return;
                //No break is needed here because return exits the function
                
            //Checks all the places that can be moved to next.
            case "move to cave":
                addText("You wonder over to the mouth of the cave. Darkness seemed to unnaturally envelope the entrance, with your gaze unable to penetrate it. You suddenly have second thoughts about entering, but taking a deep breath you meekly start making your way. There might be something useful here, you think.");
                addText("Some info about **AREA1**");
                currentPlace = "cave";
                firstVisit = true;
                timeCheck();
                //Do NOT call the moveTo**AREA1**() function!
			case "move to home":
                addText("You walk over to the place you first woke up in...");
                addText("Some info about the home area");
                currentPlace = "home";
                firstVisit = true;
                //Do NOT call the moveToHome() function!
            break;       
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast("Misunderstood command.");

     	}
	}
}