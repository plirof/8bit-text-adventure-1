function moveToHauntedHouse() {
			var newUserRaw = getInput();
            user = newUserRaw.toLowerCase();
            addTextNoLast(user);
            //Checks to see if the first five letters entered were drop and a space - If so, run remItem()function with the user's 5 letter onwards (after "drop ")
    if (user.slice(0,5) === "drop ") {
        remItem(user.slice(5));
    } else {
        switch(user){
          case 'help':
                printHelp();
                break;
          case 'walk':
                addText("Wow, this place is really creepy. You see skeletons and rotting walls.");
                addText("A plank of wood suddenly falls down next to you. You slip and find a knife right next to your head.");
                addInv("Wow, a knife to help you against any enemies.","knife",true,6);
        
        }
        
    }
}
//still working on
