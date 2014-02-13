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
			case "**CASE1**":
				
			
				timeCheck();
			break;
			case "**CASE2**":
				
			
				timeCheck();
			break;
			case "**CASE3**":
			
				timeCheck();
			break;
			case "look around":
				addText("Just inside the entrance, you wait until your eyes begin to adjust to the darkness. You breath in the stale, damp air as you hear a drip, drip, drip emanating from deeper within the cave. Your heart skips a beat before increasing to match the tempo. As you begin to make out faint shadows of rocks and pillars, you experience a deathly shiver down your spine as one of the shadowy rocks near you begins to growl. The shadowy rock slowly unfurls itself. You realise you've stumbled into a wolf's den. The wolf is NOT happy!");
				addText("From the looks of it, it seems as if you only have ONE option! You need to muster up your courage and FIGHT this wolf in order to survive! Or, possibly run away.");
				fight("wolf", 6, "note");
				
				timeCheck();
			break;
			//Static case statements
			case "jump":
				addText("You jump up for some odd reason, bumping your head in the cave. That really hurt!");
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

//Moved some code from Script.js - it seems out of place. Could somebody take a look at this? It needs cleaning up a lot, it still has the git merge conflicts left in.
/*
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
case "**CASE1**":


timeCheck();
break;
case "explore the cave":
	$("#main").empty();
	addTextNoLast(lastText);
	addText("You try to keep yourself on the edges of the cave because you don't really know what is inside and with each of your step light fades away. As you move along, touching the walls and trying to figure out what to do, you stumble upon something. It seems to be a big pile of rocks blocking your way further! You stop and think what to do next, then you look closely and notice a piece of cloth buried beneath those rocks.");
        addText("Curiously you start to remove the rocks to find out what is beneath, as you dig your way thru the pile you notice that you are no longer holding rocks in your hands! You turn around to catch more light and you realize you a holding bones in your hands, there is a human skeleton scattered beneath your feet!");
        addText("Feelings of despair and fear fly thru your head, you want to instinctively run , but you overcome your fear and you turn back facing the skeleton. Then a shiny thing catches your attention and you rush to check what it is!");	
	currentPlace = "cave";

	timeCheck();
break;
case "inv screwdriver":
<<<<<<< HEAD:js/script.js
	addInv("You picked up a screwdriver! That can be used as a weapon (5/20 attack), but in the back of your mind thoughts of generator start to appear.", "screwdriver", true, 5);
	timeCheck();
case "escape from the cave":
	addText("You run far from the cave as fast as you can!");
	currentPlace = "cave";
	firstVisit = false;

timeCheck();
=======
	if(checkForItem("screwdriver")){// true = item is in inv
		addText("You already have that item in inventory.");
	} else {
		addInv("You picked up a screwdriver! That can be used as a weapon (5/20 attack), but in the back of your mind thoughts of generator start to appear.", "screwdriver", true, 5);
	}
	timeCheck();
break;
case "escape from the cave":
	addText("You run far from the cave as fast as you can!");
	

	timeCheck();
>>>>>>> 36670167f7f178c1146fb202bb90720c17c10914:js/script.js
break;
case "look around":
addText("Just inside the entrance, you wait until your eyes begin to adjust to the darkness. You breath in the stale, damp air as you hear a drip, drip, drip emanating from deeper within the cave. Your heart skips a beat before increasing to match the tempo. As you begin to make out faint shadows of rocks and pillars, you experience a deathly shiver down your spine as one of the shadowy rocks near you begins to growl. The shadowy rock slowly unfurls itself. You realise you've stumbled into a wolf's den. The wolf is NOT happy!");
addText("From the looks of it, it seems as if you only have ONE option! You need to muster up your courage and FIGHT this wolf in order to survive! Or, possibly run away.");
fight(wolf, 6, note);

timeCheck();
break;
//Static case statements
case "jump":
addText("You jump up for some odd reason, bumping your head in the cave. That really hurt!");
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
            case "move to home":
                addText("You walk over to the place you first woke up in...");
                addText("Some info about the home area");
                currentPlace = "home";
                firstVisit = false;
                //Do NOT call the moveToHome() function!
            break;
<<<<<<< HEAD:js/script.js
            case "move closer to cave":
                addText("You wonder over to the mouth of the cave. Darkness seemed to unnaturally envelope the entrance, with your gaze unable to penetrate it. You suddenly have second thoughts about entering, but taking a deep breath you meekly start making your way. There might be something useful here, you think.");
                addText("You notice light reaches far into the cave, sice you got so far it would be a good idea to  >explore the cave.");
                currentPlace = "cave";
=======
            case "move to waterfall":
                addText("You walk over to waterfall");
                currentPlace = "waterfall";
>>>>>>> 36670167f7f178c1146fb202bb90720c17c10914:js/script.js
                firstVisit = true;
                timeCheck();
                //Do NOT call the moveTo**AREA1**() function!
            break;
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast("Misunderstood command.");

      }
}
}
*/
