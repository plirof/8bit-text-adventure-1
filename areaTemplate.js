function moveTo**AREA**() {
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
				addText("**LOOKAROUND**");
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
            case "move to **AREA1**":
                addText("You walk over to the **AREA1**.");
                addText("Some info about **AREA1**");
                currentPlace = "**AREA1**";
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