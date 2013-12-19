
/*
    Better output message for help? You decide... I think it would make it more user friendly.
        
        Put your command in the prompt box. You can either:
        
        loot [CONTAINER] 
        Loots the specified container.
        
        examine [ITEM/WEAPON/PLACE]
        Examines the specified item or place name.
        
        inv [ITEM/WEAPON]
        Short for inventory, adds the selected item or weapon to your inventory.
        
        drop [ITEM/WEAPON]
        Drops the selected item or weapon. It must be in your inventory before you can drop it. If you drop a weapon then it will be removed from your invetory and you cannot kill with it.   
        
        jump
        Makes your character jump.
        
        look around
        Your character surveys the area. Using this, you can find things you wouldn't normally see.
        
        kill [ENTITY]
                NOT YET IMPLEMENTED.
        
        quit
        Quits the game.
                
                move to [PLACE]
                Moves your character to the specified PLACE. Only some areas are acessible from other areas.
        
        Types of objects:
        
        ITEM
        E.G agave plants are ITEMs. You can put them in your iventory, examine them, or drop them.
                
                WEAPON
                Agave plants are also weapons...?
        
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
var hp = 30; //Player's health. When it gets to 0, the game stops
var atk = [0.5, "unarmed"]; //Hitpoints/Weapon. atk[0] is the hitpoints out of 20, atk[1] is the weapon. 
var alive = true; //Wether the player is alive. If it is false, the game stops.
var inv = []; //Is an array of items in the player's inventory. See functions below for adding and removing items from an array.
var currentPlace = "home"; //The players current place. By default it is set to home
var inputInvalid = false; //Check's if the user's input is valid
var cancel = false; //Checks if the user has pressed cancel on the prompt, then break out of the while loop.
var user = ""; //Defines a new empty variable which the user's input is going to be stored in.
//END OF VARIABLE AREA
        
        
//DEFINING AREA!!!! THESE ARE FUNCTIONS AND ARE NOT ACTIVE UNTIL CALLED        
//Move to home function
function moveToHome(){
        while(currentPlace === "home") {
                do {	
						$(document).ready(function() {
						$("input").focus();
						$("#main").append(">You wake up on a small island. This island is so small that you can see every bank from your current vantage point. There is a broken boat, a generator (that your not sure if works), banana trees, sharp-edged agave plants and a cave that looks unexplored.<br>");
						var userRaw = $("input[name=command]").val();
						});
				
                        /*Code to detect if the user's input is a string. The string doesn't get converted to lower case until we are sure that userRaw IS a string, because if the user leaves it blank then
                        we will get an error because you cannot call .toLowerCase() on null.*/

                        if (userRaw === null) {
                                printGameOver();
                                cancel = true;
                                break;
                        } else if (typeof userRaw != "string"){
                                inputInvalid = true;
                                $('#main').append(">Misunderstood command.<br>");
                        } else {
                        user = userRaw.toLowerCase();
                        inputInvalid = false;
                        $('#main').append(user+"<br>");
                        }
                } while (inputInvalid);
                
                //If the user pressed cancel on the prompt box, break out of the current while loop.
                if (cancel){
                        break;
                }
                                //Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
                                if (user.slice(0,5) === "drop ") {
                                        remItem(user.slice(5));
                                } else {
                                //Else, does all the other checks to see what the user has typed.
                switch(user){
                        case 'help':
                                $('#main').append("loot [CONTAINER]<br>Loots the specified container.<br><br>");
                                $('#main').append("examine [ITEM/WEAPON/PLACE]<br>Examines the specified item or place name.<br><br>"); 
                                $('#main').append("inv [ITEM/WEAPON]<br>Short for inventory, adds the selected item or weapon to your inventory.<br><br>");
                                $('#main').append("drop [ITEM/WEAPON]<br>Drops the selected item or weapon. It must be in your inventory before you can drop it. If you drop a weapon then it will be removed from your invetory and you cannot kill with it.<br><br>");
                                $('#main').append("jump<br>Makes your character jump.<br>");
                                $('#main').append("look around<br>Your character surveys the area. Using this, you can find things you wouldn't normally see.<br><br>");
                                $('#main').append("move to [PLACE]<br>Moves your character to the specified PLACE. Only some areas are acessible from other areas.<br><br>");
                                $('#main').append("Types of objects:<br><br>");
                                $('#main').append("ITEM<br>E.G agave plants are ITEMs. You can put them in your iventory, examine them, or drop them.<br><br>");
                                $('#main').append("WEAPON<br>Agave plants are also weapons...?<br><br>");
                                $('#main').append("PLACE<br>You can go inside these.<br><br>");
                                $('#main').append("CONTAINER<br>You can loot these and gain ITEMS.<br><br>");
                                $('#main').append("ENTITY<br>These are humans or animals. You can kill other ENTITYs.<br>");
                        break;
                        case 'look around':
                                $("#main").append(">The agaves and the banana trees are everywhere, in the north (n) is the generator, the boat is in the southeast (se), and the cave is in the west (w)<br>");
                                timeCheck();
                        break;
                        case 'jump':
                                $("#main").append(">You jump up for some reason you don't really know. You get some pretty nice air, and you see that there is an island right next to the one your on in the south.<br>");
                                timeCheck();
                        break;
                        case 'inv agave leaf':
                                if (invCheck()) {

                                        $('#main').append(">Your pockets are full. You have to >drop [ITEM_NAME] before picking this item up<br>");
                                }
                                else {
                                        $('#main').append(">You picked up a jagged agave leaf. This is a  weapon; However, it is only a 1/20 attack, not very good compared to a steel-tempered ulfberht.<br>");

                                        //Set hitpoints to 1, and set current weapon to agave leaf
                                        atk = [1, "agave leaf"];
                                        //Adds one to the time and checks it
                                        timeCheck();
                                        addInv("agave leaf");
										//Uncomment next line for debugging the add function
                                        //$('#main').append(inv); 
 
                                }   
                        break;
                        case "quit":
                                //Calls printGameOver() and then and exits the function. (using return makes the rest of the function unreachable)
                                printGameOver();
                                return;
                        break;
                        
                        //Checks all the places that can be moved to next.
                        case "move to generator":
                                $('#main').append("You walk over to the generator.<br>");
                                currentPlace = "generator";
                                moveToGenerator(); //Not implemented yet
                        break;
                        
                        case "move to cave":
                                $('#main').append("You walk over to the cave.<br>");

                                currentPlace = "cave";
                                moveToCave(); //Not implemented yet
                        break;
                        default :
                                //If the user typed none of the above, logs "Misunderstood command."
                                $('#main').append(">Misunderstood command.<br>");

                }
                } 
                });
        }
        //
        
        
        
        
        
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
            $('#main').append(">Night is approaching<br>");
    } else if (timeCount >= 4) { 
            nightCount += 1;
            $('#main').append(">It is night time. You have survived "+nightCount+" days<br>");
           //Resets the timeCount back to 0;
            timeCount = 0;
                        checkDays();
        }
        }

//Checks if the user is alive (does not include necessary steps to break out of current function)
function aliveCheck() {
        if (!alive) {
                printGameOver("dead<br>");   
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
                        $('#main').append(">GAME OVER<br>");
                }
        else if (status === "dead") {
            $('#main').append(">You died!<br>");
            $('#main').append(">GAME OVER<br>");

        } else if (status === "exhaust") {
        }
}

//Adds an item to the inventory array.
function addInv(item){
        inv.push(item);
        //Adds 1 to the number of items in the player's inventory.
}

//Removes an item from the inventory
function remItem(item){
        //Loops through the array and sees if anything matches the user's item to be dropped
        for (i = 0; i < item.length; i++) {
                if (inv[i] === item) {
                        //If yes, get the index of the item and remove it from the array (in .splice(), the second parameter is number of items to be removed)
                        var indexOfRemItem = inv[i];
                        inv.splice(indexOfRemItem,1);
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
        $('#main').append("You don't have that item in your inventory.<br>");
}

//Fight! NOT YET IMPLEMENTED
function fight(enemy,enemyHP) {
}

//Time frame! If you spend 30 days on the island getting to the other island, you die of exhaustion. Use of && statements to make sure that the message only gets displayed once.
function checkDays() {
        if (nightCount === 25 && timeCount === 0) {
            $('#main').append("You feel tired.");
        } else if (nightCount === 29 && timeCount === 0) {
                        $('#main').append("Your body shakes, and you feel as if you cannot go on much longer...<br>");
                } else if (nightCount === 29 && timeCount === 3) {
                        $('#main').append("You start vomiting with pain and agony. You cannot survive for more than an hour<br>");
                } else if (nightCount === 30) {
                        $('#main').append("You crawl to a quiet place before you lay down and die.<br>");



                        printGameOver();
                }
}

//END OF DEFINING AREA


//Emails:
//deluz@esedona.net - Gabriel de Luz (JS Dev)
//mstaveleytaylor@gmail.com - Matthew Taylor (Project leader)
//bobbie.rausch@icloud.com - Bram R. (JS dev)
//Add yours here!
