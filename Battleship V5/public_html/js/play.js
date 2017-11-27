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
	var playerBoard = new playerBoards("playerTable","playerCell");
        var progressBoard = new progressBoards("progressTable", "progressCell");
	var controller = new Controller();
       
	controller.shipLocation();

        
        function checkHit(cell){
            progressBoard.checkHit(this.id - 100);
        }
        
        function setShip(cell){
            playerBoard.setShip(this.id);
            
            progressBoard.shipArray = playerBoard.shipArray;
        
            progressBoard.Carrier = playerBoard.Carrier;
            progressBoard.Battleship = playerBoard.Battleship;
            progressBoard.Cruiser = playerBoard.Cruiser;
            progressBoard.Submarine = playerBoard.Submarine;
            progressBoard.Destroyer = playerBoard.Destroyer;
        }
   
        var playerCells = [];
        for(var i = 0 ; i < 100 ; i++){
            playerCells[i] = document.getElementById(i);
            playerCells[i].addEventListener("click",setShip,false);
        }
        
        var progressCells = [];
        for(var i = 0; i < 100; i++){
            var id = i + 100;
            progressCells[i] = document.getElementById(id);
            progressCells[i].addEventListener("click",checkHit,false);
        }
        
        
        
      
       
        
        
        
}

window.onload = main;