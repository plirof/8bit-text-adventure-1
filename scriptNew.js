/*
    Better output message for help? You decide... I think it would make it more user friendly.
	
	Put your command in the prompt box. You can either:
	
	loot [CONTAINER] 
	Loots the specified container.
	
	examine [ITEM/WEAPON/PLACE]
	Examines the specified item or place name.
	
	inv [ITEM/WEAPON]
	Short for inventory, adds the selected item to your inventory. If a weapon is selected, it will make it the current weapon and drop the other one in inventory.
	
	drop [ITEM/WEAPON]
	Drops the selected item or weapon. It must be in your inventory before you can drop it. Once something has been dropped, there is no getting it back.
	
	jump
	Makes your character jump.
	
	look around
	Your character surveys the area. Using this, you can find things you wouldn't normally see.
	
	kill [ENTITY]
	
	quit [NOT YET FUNCTIONAL]
	Quits the game.
	
	Types of objects:
	
	ITEM
	E.G agave plants are ITEMs. You can put them in your iventory, examine them, or drop them.
	
	PLACE
	You can go inside these.
	
	CONTAINER
	You can loot these and gain ITEMS.
	
	ENTITY
	These are humans or animals. You can kill other ENTITYs.
	
	*/ 
//VARIABLE AREA!!!!!!!!!!
var timeCount = 0; //Counter for time of day. Time count 1 is morning, 2 midday, 3 evening, and when the counter gets to 4 nightCounter += 1
var nightCount = 0; //Number of nights played.
var hp = 30; //Player's health. When it gets to 0, the game stops (nextMove = false)
var atk = [0.5, "unarmed"]; //Hitpoints/Weapon. atk[0] is the hitpoints out of 20, atk[1] is the weapon. 
var nextMove = true; //If the game is to continue playing or not
var alive = true; //Wether the player is alive. If it is false, the game stops.
var inv = []; //Is an array of items in the player's inventory. See functions below for adding and removing items from an array.
var currentPlace = "home"; //The players current place. By default it is set to home
var inputInvalid = false; //Check's if the user's input is valid
var cancel = false; //Checks if the user has pressed cancel on the prompt, then break out of the while loop.
//END OF VARIABLE AREA
	
	
//DEFINING AREA!!!! THESE ARE FUNCTIONS AND ARE NOT ACTIVE UNTIL CALLED	
//Move to home function
function moveToHome(){
	while(currentPlace === "home") {
		do {
			/*Code to detect if the user's input is a string. The string doesn't get converted to lower case until we are sure that userRaw IS a string, because if the user leaves it blank then
			we will get an error because you cannot call .toLowerCase() on null.*/
			var userRaw = prompt("What is your move?", "(Suggestion: Use the help)");
			if (userRaw === null) {
				printGameOver();
				nextMove = false;
				cancel = true;
				break;
			} else if (typeof userRaw != "string"){
				inputInvalid = true;
				console.log(">Misunderstood command.");
			} else {
			var user = userRaw.toLowerCase();
			inputInvalid = false;
			console.log(">"+user);
			}
		} while (inputInvalid);
		
		//If the user pressed cancel on the prompt box, break out of the current while loop.
		if (cancel){
			break;
		}
		
		//Checks to see wether the user's input started with the substring 'drop'. On its own because you cannot use logical operators (===) in 'case' statements.
		if (user.slice(0,4) === "drop") {
			console.log("It worked!");
		} else{
		//If it doesn't match, then it runs the main switch with all the other options.
		switch(user){
			case 'help':
				console.log(">Put your command in the prompt box. It could be anything, like loot [CONTAINER_NAME], examine [ITEM/PLACE_NAME], inv (short for inventory)[ITEM_NAME], or jump.");
				console.log(">There are four types of things. For an example, the agave plants are ITEMs; you can put them in your inventory. the cave is a PLACE; you can go inside it."); 
				console.log(">CONTAINERs are lootable. You can get vital items from inside them.");
				console.log(">ENTITYs are humans or animals. You can kill other ENTITYs.");
				console.log(">If you use look around, you can see where everything is.");
			break;
			case 'look around':
				console.log(">The agaves and the banana trees are everywhere, in the north (n) is the generator, the boat is in the southeast (se), and the cave is in the west (w)");
				timeCount += 1;
				timeCheck();
			break;
			case 'jump':
				console.log(">You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.");
				timeCount += 1;
				timeCheck();
			break;
			case 'inv agave leaf':
				if (invCheck()) {
					console.log(">Your pockets are full. You have to >drop [ITEM_NAME] before picking this item up");
				}
				else {
					console.log(">You picked up a jagged agave leaf. This is a  weapon; However, it is only a 1/20 attack, not very good compared to a steel-tempered ulfberht.");
					inv += 1;
					atk = [1, "agave leaf"];
					timeCount += 1;
					timeCheck();
					//addInv("agave leaf");
				}   
			break;
			case "quit":
				//Sets nextMove to false so the while(nextMove) function stops, and exits the function. (using return makes the rest of the function unreachable)
				nextMove = false;
				printGameOver();
				return;
			break;
			
			//Checks all the places that can be moved to next.
			case "move to generator":
				console.log("You walk over to the generator.");
				currentPlace = "generator";
				moveToGenerator();
			break;
			
			case "move to cave":
				console.log("You walk over to the cave.");
				currentPlace = "cave";
				moveToCave();
			break;
			default :
				console.log(">Misunderstood command.");
		}
		
	}
	//
	
	
	
	
	
}	
}
//Move to Generator function
/*
function moveToGenerator(){
	while(currentPlace === "generator") {
		do {
			var userRaw = prompt("What is your move?", "(Suggestion: Use the help)");
			if (userRaw === null) {
				nextMove = false;
				cancel = true;
				break;
			} else if (typeof userRaw != "string"){
				inputInvalid = true;
				console.log(">Misunderstood command.");
			} else {
			var user = userRaw.toLowerCase();
			inputInvalid = false;
			console.log(">"+user);
			}
		} while (inputInvalid);
		
		//If the user pressed cancel on the prompt box, break out of the current while loop.
		if (cancel){
			break;
		}
	
		switch(user){
			case 'help':
				console.log(">Put your command in the prompt box. It could be anything, like loot [CONTAINER_NAME], examine [ITEM/PLACE_NAME], inv (short for inventory)[ITEM_NAME], or jump.");
				console.log(">There are four types of things. For an example, the agave plants are ITEMs; you can put them in your inventory. the cave is a PLACE; you can go inside it."); 
				console.log(">CONTAINERs are lootable. You can get vital items from inside them.");
				console.log(">ENTITYs are humans or animals. You can kill other ENTITYs.");
				console.log(">If you use look around, you can see where everything is.");
			break;
			case 'look around':
				console.log(">CAVE LOOK AROUND");
				timeCount += 1;
			break;
			case 'jump':
				console.log(">You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.");
				timeCount += 1;
			break;
			case 'inv agave leaf':
				if (inv === 10) {
					console.log(">Your pockets are full. You have to >drop [ITEM_NAME] before picking this item up");
				}
				else {
					console.log(">You picked up a jagged agave leaf. This is a   weapon; However, it is only a 1/20 attack, not very good compaired to a steel-tempered ulfberht.");
					inv += 1;
					atk = [1, "agave leaf"];
					timeCount += 1;
					timeCheck();
				}   
			break;
			case "quit":
				//Sets nextMove to false so the while(nextMove) function stops, and exits the function. (using return makes the rest of the function unreachable)
				nextMove = false;
				return
			break;
			
			//Move to:
			case "move to home":
				console.log("You make your back to where you first woke up.")
				currentPlace = "home";
				moveToHome;
			break;
			default :
				console.log(">Misunderstood command.");
		}
		
	}
}
*/

//Checks the current time and warns the user when it is approaching night
function timeCheck(){
	
	if (timeCount === 3) {
		console.log(">Night is approaching");
	} else if (timeCount === 4) { 
		nightCount += 1;
		console.log(">It is night time. You have survived "+nightCount+" days");
	}
}

//Checks if the user is alive (does not include necessary steps to break out of current function
function aliveCheck() {
	if (!alive) {
		console.log(">You died!");
		console.log(">GAME OVER");
		nexMove = false;	
	}
}

//RETURNS TRUE if inventory is full.
function invCheck() { 
	if (inv[0] === 10) {
		return true;
	}
}

//Prints game over message to the user. Optional parameter "status"can be set to "dead"- if so, it prints the message ">You died!" and ">GAME OVER"
function printGameOver(status) {
	if (status === "dead") {
		console.log(">You died!");
		console.log(">GAME OVER");
		nextMove = false;
	} else {
	console.log(">GAME OVER");
	nextMove = false;
	}
}

//Adds an item to the inventory array.
//function addInv(item){
//	var invLength = inv.length;
//	inv[invLength] = item;
	//Adds 1 to the number of items in the player's inventory.
//	inv[0] += 1;
//}

function remItem(item){
	for (i = 1; i <= inv.length; i++) {
		if (inv[i] === item) {
			break;
		} else {
			console.log(">Error - you do not have that item in your inventory.");
			return;
		}
	}
	var indexOfRemItem = inv.indexOf(item);
}


//END OF DEFINING AREA

console.log(">You wake up on a small island. This island is so small that you can see every bank from your current vantage point. There is a broken boat, a generator (that your not sure if works), banana trees, sharp-edged agave plants and a cave that looks unexplored.");
while(nextMove){
	//Moves the player to home to get the chain initialized.
	moveToHome();	
}
	

//Emails:
//deluz@esedona.net - Gabriel de Luz
//mstaveleytaylor@gmail.com - Matthew Taylor (Project leader)
//Add yours here!
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
