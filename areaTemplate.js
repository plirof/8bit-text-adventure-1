function moveTo**AREA**() {

						var newUserRaw = getInput();
                        user = newUserRaw.toLowerCase();
                        addTextNoLast("&gt;" + user + "<br>");
            //Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
    if (user.slice(0,5) === "drop ") {
        remItem(user.slice(5));
    } else {
        //Else, does all the other checks to see what the user has typed.
        switch(user){
            case 'help':
				addText("<br>clear<br>Clears all text on screen and displays last shown text.<br><br>");
                addText("loot [CONTAINER]<br>Loots the specified container.<br><br>");
                addText("examine [ITEM/WEAPON/PLACE]<br>Examines the specified item or place name.<br><br>"); 
                addText("inv [ITEM/WEAPON]<br>Short for inventory, adds the selected item or weapon to your inventory.<br><br>");
                addText("drop [ITEM/WEAPON]<br>Drops the selected item or weapon. It must be in your inventory before you can drop it. If you drop a weapon then it will be removed from your invetory and you cannot kill with it.<br><br>");
                addText("jump<br>Makes your character jump.<br><br>");
                addText("look around<br>Your character surveys the area. Using this, you can find things you wouldn't normally see.<br><br>");
                addText("move to [PLACE]<br>Moves your character to the specified PLACE. Only some areas are acessible from other areas.<br><br>");
                addText("Types of objects:<br><br>");
                addText("ITEM<br>E.G a banana is an ITEM. You can put them in your iventory, examine them, or drop them (You cannot eat them). <br><br>");
                addText("WEAPON<br>E.G a sword is a weapon. Some weapons can be items, for example an agave leaf.<br><br>");
                addText("PLACE<br>You can go inside these.<br><br>");
                addText("CONTAINER<br>You can loot these and gain ITEMS.<br><br>");
                addText("ENTITY<br>These are humans or animals. You can kill other ENTITYs.<br>");
				
				//Sets lastText equal to an error so if the user types in clear next time round then it displays an error.
				lastText = ">Error - cannot display the help text.";
            break;
			case "**CASE1**":
				
			break;
			case "**CASE2**":
				
			break;
			case "**CASE3**":
				
			break;
			
			//Static case statements
            case "quit":
                //Calls printGameOver() and then and exits the function. (using return makes the rest of the function unreachable)
                printGameOver();
				addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
                return;
                //No break is needed here because return exits the function
            //Checks all the places that can be moved to next.
            case "move to **PLACE1**":
                addText("You walk over to the generator.<br>");
                currentPlace = "generator";
                moveToGenerator(); //Not implemented yet
            break;       
            case "move to **PLACE2**":
            addText("You walk over to the cave.<br>");
            currentPlace = "cave";
            moveToCave(); //Not implemented yet
            break;
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast(">Misunderstood command.<br>");

        }
	}
}