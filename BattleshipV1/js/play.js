function main() {
	let model = new Board();
}


window.onload = main;


let shipImages = ["url('shipImg/carrier.png')","url('shipImg/battleship.png')",
"url('shipImg/cruiser.png')","url('shipImg/submarine.png')", "url('shipImg/destroyer.png')"];
let shipImgCounter = 1;

function run() {
	let shipImage = document.getElementById("shipImage");
	if(shipImgCounter >= shipImages.length) {
		shipImgCounter = 0;
		shipImage.style.backgroundImage = shipImages[shipImgCounter];
		shipImgCounter++;
	}else {
		shipImage.style.backgroundImage = shipImages[shipImgCounter];
		shipImgCounter++;
	}
}




/*
//object that needs work
function Controller() {
	this.shipNames = ["Carrier","Cruiser","Battleship","Submarine","Destroyer"];
}

Controller.prototype.shipLocation = function() {
	var shipDetail = document.getElementById("shipDetail");
	
	for(var ship in this.shipNames) {
		shipDetail.innerHTML += this.shipNames[ship];
	}	
}


function main() {
	var model = new Board();
	var controller = new Controller();
	controller.shipLocation();
}

window.onload = main;
*/