//the model in MVC
function Board(tableID,tableDataID) {
       this.table = this.makeTable(tableID,tableDataID);
       document.body.appendChild(this.table);
     
       //Ships
       this.shipArray = ["Carrier","Battleship","Cruiser","Submarine","Destroyer"];
       
       this.Carrier = new Carrier();
       this.Battleship = new Battleship();
       this.Cruiser = new Cruiser();
       this.Submarine = new Submarine();
       this.Destroyer = new Destroyer();
       
       this.shipCounter = 0; //Counts how many ships are places OR how many ships are sunk depending on board
}




Board.prototype.makeTable = function(tableID, tableDataID) {

	//creates table with value passed to tableID
	var table = document.createElement("table");
	table.id = tableID;

	//creates the A-J row (AKA xAxis)
	var ROW_COL = 10;
	var xAxisRow = document.createElement("tr");
	var xAxisData = document.createElement("td");
	xAxisData.className = "xAxis";
	xAxisRow.appendChild(xAxisData);

	for(var i=0; i<ROW_COL; i++) {
		xAxisData = document.createElement("td");
		xAxisData.className = "xAxis";
		xAxisData.innerHTML = String.fromCharCode(65+i);
		xAxisRow.appendChild(xAxisData);
	}
	table.appendChild(xAxisRow);

	var tabeleRow;
	var tableData;
	var yAxisData; //creates the 0-9 column (AKA yAxis)
	var counter = 0; 
	for(var i=0; i<ROW_COL; i++) {

		//creates row
		tableRow = document.createElement("tr");

		//append a y-value (0,1,2,3,etc..) at beginning of each row
		yAxisData = document.createElement("td");
		yAxisData.className = "yAxis";
		yAxisData.innerHTML = String.fromCharCode(48+i);
		tableRow.appendChild(yAxisData);

		//create the actual cells where a ship might be placed
		for(var j=0; j<ROW_COL; j++) {
			tableData = document.createElement("td");
			tableData.className = "waterCell";
                        tableData.name = "cells";
                        //renamed tableDataID to "waterCell for the sake of the code working
			tableData.id = counter++;
                        //tableData.setAttribute("onclick", "setShip("+ ((i*10)+j)+")");
//                      tableData.setAttribute("onclick", "test()");
			tableRow.appendChild(tableData);
		}
                
                

		table.appendChild(tableRow);
     
	}
	return table;
};


Board.prototype.setShip = function(cell){
    if(this.shipCounter ===0){
        if(this.Carrier.start === null){
            setStart(this.Carrier,cell);
            alert(this.shipArray[this.shipCounter] + " starting cell is set!");
           return;
        }
        else if(this.Carrier.start !== null){
            setEnd(this.Carrier,cell);
            if(isSet(this.Carrier)){
                alert(this.shipArray[this.shipCounter] + " is set!");
                this.shipCounter++;
            }
            else{
                this.Carrier.start = null;
                alert(this.shipArray[this.shipCounter] + " is not set!");
            }
            return;
        }
             
    }
    if(this.shipCounter ===1){
        if(this.Battleship.start === null){
            setStart(this.Battleship,cell);
            alert(this.shipArray[this.shipCounter] + " starting cell is set!");
            return;
        }
        else if(this.Battleship.start !== null){
            setEnd(this.Battleship,cell);
             if(isSet(this.Battleship)){
                alert(this.shipArray[this.shipCounter] + " is set!");
                this.shipCounter++;
            }
            else{
                this.Battleship.start = null;
                alert(this.shipArray[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    if(this.shipCounter ===2){
        if(this.Cruiser.start === null){
            setStart(this.Cruiser,cell);
            alert(this.shipArray[this.shipCounter] + " starting cell is set!");
            return;
        }
        else if(this.Cruiser.start !== null){
            setEnd(this.Cruiser,cell);
             if(isSet(this.Cruiser)){
                alert(this.shipArray[this.shipCounter] + " is set!");
                this.shipCounter++;
            }
            else{
                this.Cruiser.start = null;
                alert(this.shipArray[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
     if(this.shipCounter ===3){
        if(this.Submarine.start === null){
            setStart(this.Submarine,cell);
            alert(this.shipArray[this.shipCounter] + " starting cell is set!");
            return;
        }
        else if(this.Submarine.start !== null){
            setEnd(this.Submarine,cell);
             if(isSet(this.Submarine)){
                alert(this.shipArray[this.shipCounter] + " is set!");
                this.shipCounter++;
            }
            else{
                this.Submarine.start = null;
                alert(this.shipArray[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
    if(this.shipCounter ===4){
        if(this.Destroyer.start === null){
            setStart(this.Destroyer,cell);
            alert(this.shipArray[this.shipCounter] + " starting cell is set!");
            return;
        }
        else if(this.Destroyer.start !== null){
            setEnd(this.Destroyer,cell);
             if(isSet(this.Destroyer)){
                alert(this.shipArray[this.shipCounter] + " is set!");
                this.shipCounter++;
            }
            else{
                this.Destroyer.start = null;
                alert(this.shipArray[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
    if(this.shipCounter === 5){
        alert("All ships set");
    }
};

 



//Classes for all ships

function Carrier(){
    this.size = 5;
    this.start = null;
    this.end = null;
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push("");
  }
}

function Battleship(){
    this.size = 4;
    this.start = null;
    this.end = null;
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push("");
  }
}

function Cruiser(){
    this.size = 3;
    this.start = null;
    this.end = null;
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push("");
  }
}

function Submarine(){
    this.size = 3;
    this.start = null;
    this.end = null;
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push("");
  }
}

function Destroyer(){
    this.size = 2;
    this.start = null;
    this.end = null;
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push("");
  }
}


//Functions 
function setStart(ship,cell_num){

    ship.start = cell_num;
}

function setEnd(ship,cell_num){
    var start = ship.start;
    if(isHorizontal(ship,start,cell_num) || isVerticle(ship,start,cell_num)){
        ship.end = cell_num; 
        return true;
    }
    else{
        return false;
    }
}

function isHorizontal(ship,cell1,cell2){
    var size = ship.size-1;
   // alert(ship.size);
   
    if((Math.abs(cell1-cell2) === size) && (Math.floor(cell1/10) === Math.floor(cell2/10))){
        //alert("horizontal");
        return true;
    }
   //x alert("not horizontal");
    return false;   
}

function isVerticle(ship,cell1,cell2){
    var size = ship.size-1;
    if(Math.abs((cell1-cell2)/10) === size){
        return true;
    }
    return false;
}


function isSet(ship){
    if(ship.start!== null && ship.end!== null){
        return true;
    }
    return false;
}


