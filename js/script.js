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
var homeRaw = ["inv agave leaf", "move to cave", "move to generator", "examine agave leaf", "drink water", "inv bottle", "show inv"];//Autocomplete functions for home
var generatorRaw = ["move to home", "inv banana", "examine generator","move to waterfall", "repair generator", "drink water", "show inv"];
var caveRaw = ["explore the cave", "move to waterfall", "move to home", "show inv"];
var waterfallRaw = ["move to home","move to generator","move to cave","move to bank", "show inv", "drink water","fill bottle", "wash"];
var bankRaw = ["move to home","move to waterfall", "fix boat", "show inv", "examine boat", "drink water", "fish" ];// still needs addition...
var lastText = "";//Used in the clear command
var staticAutoInv = ["look around", "jump", "quit", "clear"]
var water = 5; //if zero you die and the game ends
var fishTime = Math.floor(Math.random()*3);//If fishTime is 3, it'll go bad. If below 3, it'll remain good.
var Random1To3 = Math.floor(Math.random() * 3 + 1);
var screwdriverAvailable = false; //Just makes sure the user can't pick up the screwdriver before he has 'explored the cave'.
var generator = false; //if true the generator is working
//END OF VARIABLE AREA

//AUTOCOMPLETE AREA

//Updates the autocomplete with items from the user's inventory (used for drop commands)
function updateInv(array) {
	newInv = [];
	autoInv = [];
	for (i=0; i<inv.length; i++) {
        newInv.push("drop " + inv[i]);
	}
	for (i=0; i<staticAutoInv.length; i++) {
		newInv.push(staticAutoInv[i]);
	}
	var newArray = array.concat(newInv);
	autoInv = newArray.sort();
}

//Ges the current place and gets the appropriate autocomplete tags
function getTags() {
	switch (currentPlace) {
	case "home":
		updateInv(homeRaw);
		break;
	case "generator":
		updateInv(generatorRaw);
		break;
	case "cave":
		updateInv(caveRaw);
		break;
	case "bank":
		updateInv(bankRaw);
		break;
	case "waterfall":
		updateInv(waterfallRaw);
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
	$("#main").append(text+"<br>");
    $("#main").scrollTop($("#main")[0].scrollHeight); //scrolls down
    $("#main").append("&gt;");
	lastText = text;
 }
 
//Same as addText, but doesn't assign it to the variable lastText (used for misunderstood commands etc) 
 function addTextNoLast(text) {
	$("#main").append(text+"<br>");
    $("#main").scrollTop($("#main")[0].scrollHeight); //scrolls down
    $("#main").append("&gt;");
 }
 
 function addTextNoBreak(text) {
 	$("#main").append(text);
    $("#main").scrollTop($("#main")[0].scrollHeight); //scrolls down
    $("#main").append("&gt;");
 }
 
//Prints the starting message 
function printStart() {
	$(document).ready(function() {
		addText("You wake up on a small island. This island is so small that you can see every bank from your current vantage point. There is a broken boat, a generator (that your not sure if works), banana trees, sharp-edged agave plants and a cave that looks unexplored.(Suggestion: type 'help')");
		displayImage(imgLoc.home, imgLoc.ID);// displays home area image from the wery start of the game.
		$( "#command" ).autocomplete({
		source: autoInv,
		});
		$('#command').focus();
		
	});
}

//Prints the help message
function printHelp() {
	addTextNoLast("clear<br>Clears all text on screen and displays last shown text.<br>");
	addTextNoLast("loot [CONTAINER]<br>Loots the specified container.<br>");
	addTextNoLast("examine [ITEM/WEAPON/PLACE]<br>Examines the specified item or place name.<br>"); 
	addTextNoLast("inv [ITEM/WEAPON]<br>Short for inventory, adds the selected item or weapon to your inventory.<br>");
	addTextNoLast("drop [ITEM/WEAPON]<br>Drops the selected item or weapon. It must be in your inventory before you can drop it. If you drop a weapon then it will be removed from your invetory and you cannot kill with it.<br>");
	addTextNoLast("jump<br>Makes your character jump.<br>");
	addTextNoLast("look around<br>Your character surveys the area. Using this, you can find out which areas you can get to.<br>");
	addTextNoLast("move to [PLACE]<br>Moves your character to the specified PLACE. Only some areas are acessible from other areas.<br>");
	addTextNoLast("Types of objects:<br>");
	addTextNoLast("ITEM<br>E.G a banana is an ITEM. You can put them in your iventory, examine them, or drop them (You cannot eat them as of yet). <br>");
	addTextNoLast("WEAPON<br>E.G a sword is a weapon. Some weapons can be items, for example an agave leaf.<br>");
	addTextNoLast("PLACE<br>You can go inside these.<br>");
	addTextNoLast("CONTAINER<br>You can loot these and gain ITEMS.<br>");
	addTextNoLast("ENTITY<br>These are humans or animals. You can kill other ENTITYs.<br>");
	
}

//Gets the current place and runs that function
function findCurrentPlace() {
	switch (currentPlace) {
	case "home":
		moveToHome();
		break;
	case "cave":
		moveToCave();
		break;
	case "generator":
		moveToGenerator();
		break;
	case "waterfall":
		moveToWaterfall();
		break;
	case "bank":
		moveToBank();
		break;
	}
}

//Area images dispalay
var imgLoc = {// object containing image location in directory and HTML ID
home : "images/home.gif",
cave : "images/cavee.gif",//image location
generator : "images/generator.gif",
waterfall : "images/waterfall.gif",
bank : "images/bank.gif",
ID : "area-pic" //ID is the same for all because we want all images to be displayed in the same DIV
};
//function that enables image of areas to be displayed.
function displayImage(dirLoc, ID) { // example: dirLoc would be : imgLoc.home , and ID would be imgLoc.ID  / using information from imgLoc object above. 
              document.getElementById(ID).src = dirLoc;
}

 
//Checks if the user's input is either yes/y/Y/no/n/N/. If yes/y/Y, return true. n/N/no returns false. Default misunderstood command 
function fightCheckInput() {
	var input = getInput();
	$("#command").val("Y/N");
		switch (input) {
			case "yes":
				return true;
			break;
			case "y":
				return true;
			break;
			case "n":
				return false;
			break;
			case "N":
				return false;
			break;
			case "Y":
				return true;
			break;
			case "no":
				return false;
			default:
			addTextNoLast("Misunderstood command.");
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
            addText("Night is approaching");
    } else if (timeCount >= 4) { 
            nightCount += 1;
            addText("It is night time. You have survived "+nightCount+" days");
           //Resets the timeCount back to 0;
            timeCount = 0;
            checkDays();
            water--;
            checkWater();
            fishCheck();
        }
        }
//Checks if the user's fish is still good

function fishCheck(){
	if(checkForItem("fish")){// If fish is in inv:
		if(fishTime === 3){
			addText("Something rotten smells from your bag-- you must've forgotten about the Fish.( fish has gone bad )");
			remItem("fish");
		} else {
			addText("Your fish is still good.");	
		}
	}
	return false;
}

//Checks if the user is alive (does not include necessary steps to break out of current function)
function aliveCheck() {
        if (!alive) {
                printGameOver("dead");   
        }
}
//checks if the user has enough water, if zero alive turns too false
function checkWater() {
  if (water < 1) {
    alive = false;
  } else if (water === 1||2){
    addText("Find some water you are dying!!");
  }
}

//RETURNS TRUE if inventory is full.
function invCheck(string, item) { 
        if (inv.length === 10) {
			return true;
        } else {
        	return false;
        }
}
//find item in inv. if item is found it returns true otherwise it returns false.
function checkForItem(item) {
    for (i = 0; i < inv.length; i++) {
        if (inv[i] === item) {
            return true;
        }
    }
	return false;
}
//makes sure option "inv someItem.. " is available only in specific part of the area.
//example : checks if array caveRaw already have or not "inv screwdriver" option.
function checkForRawItem(placeRaw, stringRaw) {
                    for (i = 0; i < placeRaw.length; i++) {
                        if (placeRaw[i] === stringRaw) {
                            return true;
                        }
                    }
                    placeRaw.push(stringRaw);// pushes option "inv someItem.."
                    return false;
                }
//Prints game over message to the user. Optional parameter "status"can be set to "dead"- if so, it prints the message ">You died!" and ">GAME OVER"
function printGameOver(status) {
        if (!status) {
                addText("GAME OVER");
    	        addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
        } else if (status === "dead") {
            addText("You died!");
            addText("GAME OVER");
			addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
        } else if (status === "win") {
            addText("You have survived the last" + nightCount + " days on a desolate island and found a way out. You won!");
            addText("GAME OVER");
            addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
        }
}

//Adds an item to the inventory array.
function addInv(string,item,weapon,damage){
	for(var x = 0;x<inv.length;x++){
		if(inv[x]===item){
			addText("You already have that item in inventory.");
			return;
		}
	}
	if (inv.length < 10) {
        inv.push(item);
        //Updates autocomplete tags
		getTags();
		addText(string); 
	} else {
		addText("Your pockets are full. You have to >drop "+item+" before you can pick up this item.");
	}
	
	//Checks if the user wanted the item to be set as a weapon
	if (weapon) {
		atk = [damage, item];
	}
}

//Removes an item from the inventory
function remItem(item){
        //Loops through the array and sees if anything matches the user's item to be dropped
        for (i = 0; i < inv.length; i++) {
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
        addText("You don't have that item in your inventory.");
}

//HpCheck! Yeah!
function hpCheck(hp) {
	if(hp < 1) {
		alive = false;
		printGameOver("dead");
	}
}

function printInv() {
	if (inv.length === 0) {
		addText("You have no items in your inventory.");
	} else if (inv.length === 1) {
		var formatInv = inv.join();
		addText("You have 1 item in your inventory: " +formatInv);
	} else {
		var formatInv = inv.join();
		addText("You have "+inv.length+" items in your inventory: <br>" + formatInv);
	}
}

//Fight!
function fight(enemy,enemyHP,enemyLoot) {
	while(fightMode && alive) {
		if (atk[1] === "unarmed") {
			//If the user is unarmed, print this message and take the user's input.
			var attack = addText("Will you attack the " + enemy + ", even though you have no weapon? Y/N");
		} else {
			//If the user has a weapon equipped, print that.
			var attack = addText("Will you attack the " + enemy + " with your " + atk[1] + "? Y/N");
		}
		if (fightCheckInput(attack)) {
			//Validate the user's input and damage the enemy with the appropriate amount of hitpoints
			addText("You hit the " + enemy + " for " + atk[0] + ".");
			enemyHp -= atk[0];
			if (enemyHP < 1) {
				//
				addText("You killed the " + enemy + "!");
				var loot = addText("Do you want to loot the dead " + enemy + "?");
				if (fightCheckInput(loot)) {
					if (invCheck()) {
                                        addText("Your pockets are full.");
                                        fightMode = false;
                                        break;
                                	}
                                } else {
                                        addText("You gained " + enemyLoot + ". It came from the " + enemy + ".");
                                        addInv(enemyLoot);
                                        fightMode = false;
                                        break;
                                }
			}
			var enemyATK = Math.floor(Math.random * 2 + 7) + (enemyHp % 2);
			hpCheck(hp);
		} else {
			if (pots > 0) {
				var potion = addText ("Do you want to use a potion?Y/N");
				if (fightCheckInput(potion)) {
					pots -= 1;
					hp += 20;
					addText("You take a swig of your potion and gain 20 hp.");
				} else {
					var flee = addText("Would you like to flee from the " + enemy + "?");
					if (fightCheckInput(flee)) {
						var probFlee = Math.random;
						if (probFlee > 0.625) {
							addText("You got away scotch-free!");
							fightMode = false;
							break;
						} else {
							addText("The " + enemy + " pulled you back into battle.");
							hp -= 15;
							addText("The " + enemy + " gets a cheap hit on you and you lose 15 hp (half of your default hp).");
						}
					} else {
						addText("You let the " + enemy + " kill you.");
						alive = false;
					}
				}
			} else {
				var flee = addText("Would you like to flee from the " + enemy + "?");
				if (fightCheckInput(flee)) {
					var probFlee = Math.random;
					if (probFlee > 0.625) {
						addText("You got away scotch-free!");
						fightMode = false;
						break;
					} else {
						addText("The " + enemy + " pulled you back into battle.");
						hp-15;
						addText("The " + enemy + " gets a cheap hit on you and you lose 15 hp (half of your default hp).");
					}
				} else {
					addText("You let the " + enemy + " kill you.");
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
                        addText("Your body shakes, and you feel as if you cannot go on much longer...");
                } else if (nightCount === 29 && timeCount === 3) {
                        addText("You start vomiting blood in pain and agony. You cannot survive for more than an hour");
                } else if (nightCount === 30) {
                    addText("You crawl to a quiet place before you lay down and die.");
		    printGameOver();
        }
}

//Fish!
function fish() {
	var fish = Math.floor(Math.random() * 2);
	do {
		addText("You cast your line.");
		if (fish) {
			addText("There seems to be a fish on the line!");
			fish = Math.floor(Math.random() * 2);
			if (fish) {
				addInv("You caught a fish. Eat it before it goes bad!","fish", false, 0);
				timeCheck();
			} else {
				addText("The fish got away!");
			}
		}
		var line = addText("Will you cast the line? Y/N");
	} while(fightCheckInput(line))
}

//Move to home function (default area)
function moveToHome() {
	
			var newUserRaw = getInput();
                        user = newUserRaw.toLowerCase();
                        addTextNoLast(user);
            //Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
    if (user.slice(0,5) === "drop ") {
        remItem(user.slice(5));
    } else {
        //Else, does all the other checks to see what the user has typed.
        switch(user){
            case "hey bob":
            	addText("I know where you live.");
            break;
            case 'help':
				printHelp();
            break;
            case "show inv":
            	printInv();
            break;	
            		case "drink water":
   				if(checkForItem("full_bottle") === true){
        				remItem("full_bottle")
        				addInv("you drinked your water", "bottle", false, 0);
        				water += 1;
					timeCheck();
       				}else {
       					addText("You don't have a full bottle");
			 		timeCheck();
			 	}
			break;
			case "examine agave leaf":
				addText("You examine the sharp, spiky plant. It looks a bit like some kind of spineless cactus.");
				timeCheck();
			break;
			case "inv agave leaf":
				addInv("You picked up a jagged agave leaf. This is a  weapon; However, it is only a 1/20 attack, not very good compared to a steel-tempered ulfberht.", "agave leaf", false, 0); 
				timeCheck();
			break;
			case "look around":
				addText("The agave trees are everywhere, in the north (n) is the generator and the banana trees, the boat is in the southeast (se), and the cave is in the west (w)");
				timeCheck();
			break;
			//Static case statements
			case "jump":
				addText("You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.");
				addText("By jumping you catch a reflexion off something in the distance.");
				addText("You jump again and now you are sure that something is behind a rock partly buried in the sand.");
				addText("You approach the thing and notice that it is a plastic bottle, something definitely worth stashing in inventory!");
				timeCheck();
			break;
			case "clear":
				//Empties the main div and prints lastKnown text
				$("#main").empty();
				addTextNoLast(lastText);
			break;
			case "inv bottle":
				addInv("You picked up a bottle.", "bottle", false, 0)	
			break;
            case "quit":
                //Calls printGameOver() and then and exits the function. (using return makes the rest of the function unreachable)
                printGameOver();
				addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.hmtml'>here</a> to play again.");
                return;
                //No break is needed here because return exits the function
                
            //Checks all the places that can be moved to next.
            case "move to generator":
            	displayImage(imgLoc.generator, imgLoc.ID);
                addText(">You slowly make your way over to the generator. As you approach it, a low humming sound can be heard, and<br>");
                addText("It looks like it was on board some kind of boat before it washed up on the beach here. You see the banana trees with their fruits and your stomach tells you to take one. Apart from these two, there's not much you can do here.");
                currentPlace = "generator";
                firstVisit = true;
                timeCheck();
                //Do NOT call the moveToGenerator() function!
            break;       
            case "move to cave":
            	displayImage(imgLoc.cave, imgLoc.ID);// display area cave picture.
            	addText("You wonder over to the mouth of the cave. Darkness seemed to unnaturally envelope the entrance, with your gaze unable to penetrate it. You suddenly have second thoughts about entering, but taking a deep breath you meekly start making your way. There might be something useful here, you think.");
                addText("You notice light reaches far into the cave, sice you got so far it would be a good idea to  >explore the cave.");
            	currentPlace = "cave";
            	firstVisit = true;
            	timeCheck();
            	//Do NOT call the moveToCave() function!
            break;
            case "inv banana":
            	addInv("You go to a banana tree and get a banana. It\'s perfectly yellow and tantalizingly good-scented.","banana", false, 0)
            break;
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast("Misunderstood command.");

     	}
	}
}

function moveToCave() {
	var newUserRaw = getInput();
	user = newUserRaw.toLowerCase();
	addTextNoLast(user);
	//Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
	if (user.slice(0, 5) === "drop ") {
		remItem(user.slice(5));
	} else {
		//Else, does all the other checks to see what the user has typed.
		switch (user) {
		case 'help':
			printHelp();
			break;

		case "**Some Area**":

			
			timeCheck();
			break;
		case "explore the cave":
			addText("You uncomfortably keep yourself on the sides of the cave - since you really don't know what's inside of it - and with each step that you take, light fades away quickly into the darkness behind you. As you move along (by touching the walls and figuring out what to do), you stumble upon something; It seems to be a big pile of rocks blocking your way further! You stop and survey the pile of rocks, then notice a piece of cloth buried underneath.");
			addText("Curiously, you remove the rocks to find out what is beneath. And as you dug your way through the pile, you noticed that you were no longer holding rocks in your hands! You turned around to catch more light and realized that you were holding some bones in your hands - you found a human skeleton scattered beneath your feet!");
			addText("Feeling a sudden despair and fear fly through your head, you want to instinctively run, but you overcome your fear and turn back facing the skeleton. Then a shiny thing catches your attention and you rush to check what it is!");
			//makes sure option "inv screwdriver" get available here and not the moment user enter the cave.
			checkForRawItem(caveRaw, "inv screwdriver");
			screwdriverAvailable = true;
			timeCheck();
			break;

		case "inv screwdriver":
			if (screwdriverAvailable) {
				if (checkForItem("screwdriver")) { // true = item is in inv
					addText("You already have that item in inventory.");
	
				} else {
					addInv("You picked up a screwdriver! That can be used as a weapon (5/20 attack), but in the back of your mind thoughts of generator start to appear.", "screwdriver", true, 5);
				}
				timeCheck();
			} else {
				addTextNoLast("Misunderstood command. Hint: explore the cave!");
			}
			break;
		case "look around":
			addText("Just inside the entrance, you wait until your eyes begin to adjust to the darkness. You breath in the stale, damp air as you hear a drip, drip, drip emanating from deeper within the cave. Your heart skips a beat before increasing to match the tempo. As you begin to make out faint shadows of rocks and pillars, you experience a deathly shiver down your spine as one of the shadowy rocks near you begins to growl. The shadowy rock slowly unfurls itself. You realise you've stumbled into a wolf's den. The wolf is NOT happy!");
			addText("From the looks of it, it seems as if you only have ONE option! You need to muster up your courage and FIGHT this wolf in order to survive! Or, possibly run away.");
				var newUserRaw = getInput();
				choices = newUserRaw.toLowerCase();
				switch(choices) {
				case 'fight':
					fight("wolf", 6, "bones");
					fightMode = true;
					break;
					case 'run':
						addText("You ran outside the cave as fast as you could, not looking back for a second!");
						currentPlace = "home";
						firstVisit = false;
						timeCheck();
						break;
						
			}
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
			displayImage(imgLoc.home, imgLoc.ID);
			addText("You walk over to the place you first woke up in...");
			addText("This island is so small that you can see every bank from your current vantage point.In your near distance there is  a broken boat, a generator, banana trees, sharp-edged agave plants and a cave.");
			currentPlace = "home";
			firstVisit = false;
			//Do NOT call the moveToHome() function!
			break;

		case "move to waterfall":
			displayImage(imgLoc.waterfall, imgLoc.ID);
			addText("You walk over to the waterfall.");
			addText("Finally reaching it, you sit down on a rock and attempt to clear your thoughts. It was a hard day for you so far; You're tired, dirty, thirsty - but despite all your troubles, you find the strength to smile at least. After all, you found some water! You decide to rest here for a while and consider your options. If only you had a bottle with you...");
			currentPlace = "waterfall";
			firstVisit = false;
			timeCheck();
			//Do NOT call the moveToWaterFall() function!
			break;

		default:
			//Checks to see if user's input is 'inv screwdriver' when first visiting. If so, it prints
			//"Misunderstood command".
			if(user === "inv screwdriver" && firstVisit === true) {
			
			//If the user typed none of the above, logs "Misunderstood command."
			addTextNoLast("Misunderstood command.");

			
			} else {
				addTextNoLast("Misunderstood command.");
			}
		}
	}
}

//move to waterfall function
function moveToWaterfall() {
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
            case "drink water":
   			if(checkForItem("full_bottle") === true){
        			remItem("full_bottle")
        			addInv("you drinked your water", "bottle", false, 0);
        			water += 1;
				timeCheck();
       			}else {
       				addText("You don't have a full bottle");
			 	timeCheck();
			 }
	    break;
            case "fill bottle":
                        if(checkForItem("bottle") === true) {
                            remItem("bottle");
                            addInv("filled a bottle.", "full_bottle", false, 0);
                        }  else{
                            addText("You don't have a bottle to fill.")
                        }     
                        timeCheck();
            break;
            case "wash":
                        addText("You washed yourself but there is something strange in the water, there are little yellow stones.")
                        timeCheck();
            break;
            case "look around":
                        addText("You look around and you see that there is an island right next to the one your on in the south.");
                        timeCheck();
            break;
            //Static case statements
            case "jump":
                        addText("You jump up for some reason you don't really know. You get some pretty nice air");
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
                                addText("Click <a href='index.html'>here</a> to go home, or click <a href='game.html'>here</a> to play again.");
                return;
                //No break is needed here because return exits the function
                
            //Checks all the places that can be moved to next.
            
            case "move to home":
            	displayImage(imgLoc.home, imgLoc.ID);
		addText("You walk over to the place you first woke up in...");
		addText("This island is so small that you can see every bank from your current vantage point.In your near distance there is  a broken boat, a generator, banana trees, sharp-edged agave plants and a cave.");
		currentPlace = "home";
		firstVisit = false;
		//Do NOT call the moveToHome() function!
		break;
		
	    case "move to generator":
	    	displayImage(imgLoc.generator, imgLoc.ID);
		addText(">You slowly make your way over to the generator. As you approach it, a low humming sound can be heard, and<br>");
		addText("It looks like it was on board some kind of boat before it washed up on the beach here. You see the banana trees with their fruits and your stomach tells you to take one. Apart from these two, there's not much you can do here.");
		currentPlace = "generator";
		firstVisit = false;
		timeCheck();
		//Do NOT call the moveToGenerator() function!
		break; 
	    case "move to cave":
	    	displayImage(imgLoc.cave, imgLoc.ID);
		addText("You wonder over to the mouth of the cave. Darkness seemed to unnaturally envelope the entrance, with your gaze unable to penetrate it. You suddenly have second thoughts about entering, but taking a deep breath you meekly start making your way. There might be something useful here, you think.");
		addText("You notice light reaches far into the cave, since you got so far it would be a good idea to: explore the cave.");
		addText("You walk into the cave.");
		currentPlace = "cave";
		firstVisit = false;
		timeCheck();
		//Do NOT call the moveToCave() function!
		break;
	    case "move to bank":
		displayImage(imgLoc.bank, imgLoc.ID);
		addText("You walk your way to the eastern bank of the island, distant image of the boat begins to be clearer. When you arrive at the bank, the condition of themove to home boat does not impress you too much, there will be some repairing needed.");
		currentPlace = "bank";
		firstVisit = false;
		timeCheck();
		//Do NOT call the moveToBank() function!
		break;
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast("Misunderstood command.");

             }
        }
}
//Move to generator function
function moveToGenerator() {
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
            case "show inv":
            	printInv();
            break;
			case "examine generator":
				addText("The generator has a few wires missing but a low hum tells you that electricity is still running through parts of it. If only you had a screwdriver...");
				timeCheck();
			break;
			case "repair generator":
                		if(checkForItem("screwdriver") === true){
                        		if (Random1To3 < 2){
                            			addText("You repaired the generator. And you hear a weird sound coming from the ship...");
                            			generator = true;
                            			timeCheck();
                        	} else{
                            		addText("You got electrocuted and died!");
                            		alive = false;
                            		timeCheck();
                        	}
                		} else{
                    			addText("You looked at the generator but you couldn't repair it. If only you had a screwdriver...");
                    			timeCheck();
                		}
            		break;
			case "drink water":
   				if(checkForItem("full_bottle") === true){
        				remItem("full_bottle")
        				addInv("you drinked your water", "bottle", false, 0);
        				water += 1;
					timeCheck();
       				}else {
       					addText("You don't have a full bottle");
			 		timeCheck();
			 	}
			break;
			case "inv banana":
				addText("You take a ripe banana from one of the nearby trees. As it fills your stomach your hunger somewhat diminishes.");
				addInv("banana");
				timeCheck();
			break;
			case "look around":
				addText("From here the only place you can go to is the area where you first woke up. (move to home)");
				timeCheck();
			break;
			//Static case statements
			case "jump":
				addText("You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.");
				timeCheck();
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
            	displayImage(imgLoc.home, imgLoc.ID);
                addText("You walk over to the place you first woke up in...");
                addText("This island is so small that you can see every bank from your current vantage point.In your near distance there is  a broken boat, a generator, banana trees, sharp-edged agave plants and a cave.");
                currentPlace = "home";
                firstVisit = true;
                //Do NOT call the moveToHome() function!
            break;
            case "move to waterfall":
            	displayImage(imgLoc.waterfall, imgLoc.ID);
		addText("You walk over to the waterfall.");
		addText("You finally reach the waterfall then you just sit down on a rock trying to clear your thoughts. It was a hard day for you so far, you are dirty, tired and thirsty , but despite all your troubles you find strength to smile , after all you found source of water! You decide to rest here for a while and consider your options, if you only had a bottle with you...");
		currentPlace = "waterfall";
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
//Move to bank command
function moveToBank() {
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
			case "examine boat":
				addText("It seems that you could fix it, but you would need a board of wood.");
				timeCheck();
			break;
			case "fix boat":
				if (checkForItem("wooden_board") === true) {
					remItem("wooden_board");
					addText("It seems you\'re about to finish this hard, grueling journey. All you have to do is get on.");
				} else {
					addText("You do not have the items to repair the boat.");
				}
				timeCheck();
			break;
			case "get aboard boat":
				addText("All of your time here has been coming to this moment. You are very releived that all of this nightmare is finally over.");
				timeCheck();
			break;
			case "drink water":
            			remItem("full_bottle")
            			addInv("you drinked your water", "bottle", false, 0);
            			water += 1;
            		break;
			case "look around":
				addText("You can see the island you used to call home, a lot of fish below the surface, and the boat, which has a giant hole in the bottom, from your current vantage point.");
				timeCheck();
			break;
			case "fish":
				if (checkForItem("fishing_rod") === true) {
					fish();
				} else {
					addText("You\'ll need a fishing rod to fish. You really wish you had a care package full of these types of tools.");
				}
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
            case "move to waterfall":
            	displayImage(imgLoc.waterfall, imgLoc.ID);
		addText("You walk over to the waterfall.");
		addText("You return back to the waterfall, remember to take some water with you since you are passing by.");
		currentPlace = "waterfall";
		firstVisit = false;
		timeCheck();
		//Do NOT call the moveTo**AREA1**() function!
		break;
	    case "move to home":
	    	displayImage(imgLoc.home, imgLoc.ID);
		addText("You walk over to the place you first woke up in...");
		addText("This island is so small that you can see every bank from your current vantage point.In your near distance there is  a broken boat, a generator, banana trees, sharp-edged agave plants and a cave.");
		currentPlace = "home";
		firstVisit = false;
		//Do NOT call the moveToHome() function!
		break;       
            default :
            //If the user typed none of the above, logs "Misunderstood command."
            addTextNoLast("Misunderstood command.");

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
		getTags();
		$( "#command" ).autocomplete({
		source: autoInv
		});
	}
});

//Emails:
//deluz@esedona.net - Gabriel de Luz (JS Dev)
//mstaveleytaylor@gmail.com - Matthew Taylor (Project leader)
//bobbiy.bram@gmail.com - Bram R. (JS dev)
//amritaclehane@gmail.com - Armita C. (JS Dev)
//adam@adambanky.com - Adam Banky (JS Dev & Lead designer)
//khalildacoder@gmail.com - Khalil (Assistant Designer)
//yazidnoned@hotmail.com - Yazid (JS Dev)
//goggy25@gmail.com - fundocro (JS Dev, Assistant Designer)
