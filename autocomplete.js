//Autocomplete
var inv = ["bacon", "agave leaf", "sword"];
var newInv = [];
    for (i=0; i<inv.length; i++) {
        newInv.push("drop " + inv[i]);
	}
function addAutoDrop(array) {
	var newArray = array.concat(newInv);
	var sortNewArray = newArray.sort();
	return sortNewArray;
}

var homeRaw = ["inv agave leaf", "look around", "jump", "move to cave", "move to generator", "quit", "examine agave leaf", "help"];
var home = addAutoDrop(homeRaw);
console.log(home);
//End of autocomplete area