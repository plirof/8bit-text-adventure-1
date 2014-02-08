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