//VARIABLE AREA!!!!!!!!!!
var timeCount = 0; //Counter for time of day. Time count 1 is morning, 2 midday, 3 evening, and when the counter gets to 4 nightCounter += 1
var nightCount = 0; //Number of nights played.
var hp = 30; //Player's health. When it gets to 0, the game stops
var atk = [0.5, "unarmed"]; //Hitpoints/Weapon. atk[0] is the hitpoints out of 20, atk[1] is the weapon. 
var alive = true; //Wether the player is alive. If it is false, the game stops.
var inv = []; //Is an array of items in the player's inventory. See functions below for adding and removing items from an array.
var currentPlace = "home"; //The players current place. By default it is set to home
var cancel = false; //Checks if the user has pressed cancel on the prompt, then break out of the while loop.
var user = "";//Defines a new empty variable which the user's input is going to be stored in.
var fightMode = false; //This makes you fight. While you fight, no time goes by. If this is put back at false, the fight stops
var pots = 0; //Pots is short for potions. If you have potions, you can use them to regain life.
var newInv = []; //Used in the autocomplete function
var autoInv = []; //Used in the autocomplete function
var homeRaw = ["inv agave leaf", "look around", "jump", "move to cave", "move to generator", "quit", "examine agave leaf", "help", "clear", ""];//Autocomplete functions for home
var lastText = "";//Used in the clear command
//END OF VARIABLE AREA

//AUTOCOMPLETE AREA

//Updates the autocomplete with items from the user's inventory (used for drop commands)
function updateInv(array) {
	newInv = [];
	autoInv = [];
	for (i=0; i<inv.length; i++) {
        newInv.push("drop " + inv[i]);
	}
	var newArray = array.concat(newInv);
	autoInv = newArray.sort();
}

//Ges the current place and gets the appropriate autocomplete tags
function getTags() {
	switch(currentPlace) {
	case "home":
		updateInv(homeRaw);
	break;
	}
}

//Calls the function to initialise the autocomplete function
getTags();

//END OF AUTOCOMPLETE AREA

//DEFINING AREA!!!! THESE ARE FUNCTIONS AND ARE NOT ACTIVE UNTIL CALLED

//Gets the user's input on a press of the return key.
function getInput() {
		$('#command').focus();		
		var userRaw = $('#command').val();
		return userRaw;
}     

//Adds the text to the screen and scrolls down (if need be). Also assigns text to lastText variable for the clear option.
function addText(text) {
	$("#main").append(text);
    $("#main").scrollTop($("#main")[0].scrollHeight); //scrolls down
	lastText = text;
 }
 
//Same as addText, but doesn't assign it to the variable lastText (used for misunderstood commands etc) 
 function addTextNoLast(text) {
	$("#main").append(text);
    $("#main").scrollTop($("#main")[0].scrollHeight); //scrolls down
 }
 
//Prints the starting message 
function printStart() {
	$(document).ready(function() {
		addText(">You wake up on a small island. This island is so small that you can see every bank from your current vantage point. There is a broken boat, a generator (that your not sure if works), banana trees, sharp-edged agave plants and a cave that looks unexplored.(Suggestion: type 'help')<br>");
		$( "#command" ).autocomplete({
		source: autoInv,
		});
		$('#command').focus();
		
	});
}

//Gets the current place and runs that function
function findCurrentPlace() {
	switch (currentPlace) {
		case "home":
			moveToHome();
		break;
		case "cave":
		
		break;
		case "generator":
		
		break;
	}
}
 
//Checks if the user's input is either yes/y/Y/no/n/N/. If yes/y/Y, return true. n/N/no returns false. Default misunderstood command 
function fightCheckInput() {
	var input = getInput();
	$("#command").val("Y/N");
		switch (input) {
			case "yes":
				return true;
			case "y":
				return true;
			case "n":
				return false;
			case "N":
				return false;
			case "Y":
				return true;
			case "no":
				return false;
			default:
			
			addTextNoLast(">Misunderstood command.");
		}
	}
       
//Adds two arrays together. Useful in looting containers and enemys        
function loot(loot) {
	if (inv.length + loot.length <= 10) {
		inv.concat(loot);
	} else {
		addText(">Your pockets are full. You must drop " + ((inv.length + loot.length) - 10) + " items to loot the enemy.");
	}
}
        
//Checks the current time and warns the user when it is approaching night. Optional parameter to change how much time has passed. Default set to 1.
function timeCheck(timePassed){
    if (!timePassed) {
                //If nothing was passed in the timePassed argument, it defaults to one.
                timeCount += 1;
                checkDays();
    } else {
        //If something was passed, += to timeCount.
        timeCount += timePassed;
                checkDays();
    }
    //Checks and warns the user when it is night time, and adds one to nightCount
        if (timeCount === 3) {
            addText(">Night is approaching<br>");
    } else if (timeCount >= 4) { 
            nightCount += 1;
            addText(">It is night time. You have survived "+nightCount+" days<br>");
           //Resets the timeCount back to 0;
            timeCount = 0;
                        checkDays();
        }
        }

//Checks if the user is alive (does not include necessary steps to break out of current function)
function aliveCheck() {
        if (!alive) {
                printGameOver("dead");   
        }
}

//RETURNS TRUE if inventory is full.
function invCheck() { 
        if (inv.length === 10) {
                return true;
        }
}

//Prints game over message to the user. Optional parameter "status"can be set to "dead"- if so, it prints the message ">You died!" and ">GAME OVER"
function printGameOver(status) {
                if (!status) {
                        addText(">GAME OVER<br>");
                }
        else if (status === "dead") {
            addText(">You died!<br>");
            addText(">GAME OVER<br>");

        } 
}

//Adds an item to the inventory array.
function addInv(item){
        inv.push(item);
        //Updates autocomplete tags
		getTags();
}

//Removes an item from the inventory
function remItem(item){
        //Loops through the array and sees if anything matches the user's item to be dropped
        for (i = 0; i < item.length; i++) {
                if (inv[i] === item) {
                        //If yes, get the index of the item and remove it from the array (in .splice(), the second parameter is number of items to be removed)
                        var indexOfRemItem = inv[i];
                        inv.splice(indexOfRemItem,1);
						//Update autocomplete tags
						getTags();
                        //If the current weapon is the item to be dropped, 
                        if (atk[1] === item) {
                                //If the item dropped was the currently equipped weapon, remove it from the atk aray and change the weapon to "unarmed", 0.5 hitpoints.
                                atk[1] = "unarmed";
                                atk[0] = 0.5;
                        }
                        return;
                } 
        }
        //Will not be executed if a match has been found because it will be unreachable by the 'return' 
        addText(">You don't have that item in your inventory.<br>");
}

//HpCheck! Yeah!
function hpCheck(hp) {
	if(hp < 1) {
		alive = false;
		printGameOver("dead");
	}
}

//Fight!
function fight(enemy,enemyHP,enemyLoot) {
	while(fightMode && alive) {
		if (atk[1] === "unarmed") {
			//If the user is unarmed, print this message and take the user's input.
			var attack = addText(">Will you attack the " + enemy + ", even though you have no weapon? Y/N");
		} else {
			//If the user has a weapon equipped, print that.
			var attack = addText(">Will you attack the " + enemy + " with your " + atk[1] + "? Y/N");
		}
		if (fightCheckInput(attack)) {
			//Validate the user's input and damage the enemy with the appropriate amount of hitpoints
			addText(">You hit the " + enemy + " for " + atk[0] + ".");
			enemyHp -= atk[0];
			if (enemyHP < 1) {
				//
				addText(">You killed the " + enemy + "!");
				var loot = addText(">Do you want to loot the dead " + enemy + "?");
				if (fightCheckInput(loot)) {
					if (invCheck()) {
                                        addText(">Your pockets are full.");
                                        fightMode = false;
                                        break;
                                	}
                                } else {
                                        addText(">You gained " + enemyLoot + ". It came from the " + enemy + ".");
                                        addInv(enemyLoot);
                                        fightMode = false;
                                        break;
                                }
			}
			var enemyATK = Math.floor(Math.random * 2 + 7) + (enemyHp % 2);
			hpCheck(hp);
		} else {
			if (pots > 0) {
				var potion = addText (">Do you want to use a potion?Y/N");
				if (fightCheckInput(potion)) {
					pots -= 1;
					hp += 20;
					addText(">You take a swig of your potion and gain 20 hp.");
				} else {
					var flee = addText(">Would you like to flee from the " + enemy + "?");
					if (fightCheckInput(flee)) {
						var probFlee = Math.random;
						if (probFlee > 0.625) {
							addText(">You got away scotch-free!");
							fightMode = false;
							break;
						} else {
							addText(">The " + enemy + " pulled you back into battle.");
							hp -= 15;
							addText(">The " + enemy + " gets a cheap hit on you and you lose 15 hp (half of your default hp).");
						}
					} else {
						addText(">You let the " + enemy + " kill you.");
						alive = false;
					}
				}
			} else {
				var flee = addText(">Would you like to flee from the " + enemy + "?");
				if (fightCheckInput(flee)) {
					var probFlee = Math.random;
					if (probFlee > 0.625) {
						addText(">You got away scotch-free!");
						fightMode = false;
						break;
					} else {
						addText(">The " + enemy + " pulled you back into battle.");
						hp-15;
						addText(">The " + enemy + " gets a cheap hit on you and you lose 15 hp (half of your default hp).");
					}
				} else {
					addText(">You let the " + enemy + " kill you.");
					alive = false;
					break;
				}
			}
		}
	}
}

//Time frame! If you spend 30 days on the island getting to the other island, you die of exhaustion. Use of && statements to make sure that the message only gets displayed once.
function checkDays() {
        if (nightCount === 25 && timeCount === 0) {
            addText("You feel tired.");
        } else if (nightCount === 29 && timeCount === 0) {
                        addText(">Your body shakes, and you feel as if you cannot go on much longer...<br>");
                } else if (nightCount === 29 && timeCount === 3) {
                        addText(">You start vomiting blood in pain and agony. You cannot survive for more than an hour<br>");
                } else if (nightCount === 30) {
                    addText(">You crawl to a quiet place before you lay down and die.<br>");
					printGameOver();
                }
}

//Move to home function
function moveToHome() {
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
			case "clear":
				$("#main").empty();
				addTextNoLast(lastText);
			break;
			case "examine agave leaf":
				addText(">You examine the sharp, spiky plant. It looks a bit like some kind of cactus, but it doesn't have many spikes");
				timeCheck();
			break;
            case 'look around':
                addText(">The agaves and the banana trees are everywhere, in the north (n) is the generator, the boat is in the southeast (se), and the cave is in the west (w)<br>");
                timeCheck();
            break;
            case 'jump':
                addText(">You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.<br>");
                timeCheck();

            break;
            case 'inv agave leaf':
                if (invCheck()) {
                    addText(">Your pockets are full. You have to >drop [ITEM_NAME] before picking this item up<br>");
                }
                else {
                    addText(">You picked up a jagged agave leaf. This is a  weapon; However, it is only a 1/20 attack, not very good compared to a steel-tempered ulfberht.<br>");


                    //Set hitpoints to 1, and set current weapon to agave leaf
                    atk = [1, "agave leaf"];
                    //Adds one to the time and checks it
                    timeCheck();
                    addInv("agave leaf");
					//Uncomment next line for debugging the add function
                    //addText(inv); 
                }   
            break;
           case "quit":
                //Calls printGameOver() and then and exits the function. (using return makes the rest of the function unreachable)
                printGameOver();
				addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.html'>here</a> to play again.");
                return;
                //No break is needed here because return exits the function
            //Checks all the places that can be moved to next.
            case "move to generator":
                addText(">You walk over to the generator.<br>");
                currentPlace = "generator";
                moveToGenerator(); //Not implemented yet
            break;       
            case "move to cave":
            addText(">You walk over to the cave.<br>");
            currentPlace = "cave";
            moveToCave(); //Not implemented yet
            break;
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast(">Misunderstood command.<br>");

        }
	}
}
 
 
 
//END OF DEFINING AREA

//Prints the starting message
printStart();

//If the user pressed the enter key get the input and use the autocomplete function
$(document).keydown(function(key) {
	if (parseInt(key.which,10) === 13) {
		findCurrentPlace();
		$("input").val("");
		$( "#command" ).autocomplete({
		source: autoInv
		});
	}
});

//Emails:
//deluz@esedona.net - Gabriel de Luz (JS Dev)
//mstaveleytaylor@gmail.com - Matthew Taylor (Project leader)
//bobbie.rausch@icloud.com - Bram R. (JS dev)
//amritaclehane@gmail.com - Armita C. (JS Dev)
//adam@adambanky.com - Adam Banky (JS Dev & Lead designer)
//khalildacoder@gmail.com - Khalil (Assistant Designer)
