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
        
        function setShip(cell){
            playerBoard.setShip(this.id);
            if(playerBoard.shipCounter === 5){ //Copys ships over to progressBoard to practice hit
                progressBoard.Carrier = playerBoard.Carrier;
                progressBoard.Battleship = playerBoard.Battleship;
                progressBoard.Cruiser = playerBoard.Cruiser;
                progressBoard.Submarine = playerBoard.Submarine;
                progressBoard.Destroyer = playerBoard.Destroyer;
               
            }
        }
   
        var playerCells = [];
        for(var i = 0 ; i < 100 ; i++){
            playerCells[i] = document.getElementById(i);
            playerCells[i].addEventListener("click",setShip,false);
        }
        
        
        
      
       
        
        
        
}

window.onload = main;