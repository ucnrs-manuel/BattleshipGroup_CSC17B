//object that needs work
function Controller() {
	this.shipNames = ["Carrier","Cruiser","Battleship","Submarine","Destroyer"];
}

Controller.prototype.shipLocation = function() {
	var shipDetail = document.getElementById("shipDetail");
	
	for(var ship in this.shipNames) {
		shipDetail.innerHTML += this.shipNames[ship];
	}	
};




    




function main() {
	var playerBoard = new Board("playerTable","playerCell");
        var progressBoard = new Board("progressTable", "progressCell");
	var controller = new Controller();
       // playerBoard.initialize();
	controller.shipLocation();
        function setShip(cell){
          playerBoard.setShip(this.id);
        }
   
        var playerCells = [];
        for(var i = 0 ; i < 100 ; i++){
            playerCells[i] = document.getElementById(i);
            playerCells[i].addEventListener("click",setShip,false);
        }
        
      
       
        
        
        
}

window.onload = main;