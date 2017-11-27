//the model in MVC
function playerBoards(tableID,tableDataID) {
       this.table = this.makeTable(tableID,tableDataID);
       document.body.appendChild(this.table);
     
       //Ships
       
       this.Carrier = new Carrier();
       this.Battleship = new Battleship();
       this.Cruiser = new Cruiser();
       this.Submarine = new Submarine();
       this.Destroyer = new Destroyer();
       this.shipArray = [this.Carrier,this.Battleship,this.Cruiser,this.Submarine,this.Destroyer]; //Array that holds ship objects
       this.shipNames = ["Carrier","Battleship","Cruiser","Submarine","Destroyer"]; // Array that holds string names of ships
       this.shipCounter = 0; //Counts how many ships are placed
}




playerBoards.prototype.makeTable = function(tableID, tableDataID) {

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


//Classes for all ships

function Carrier(){
    this.cell_nums = []; // Used to test whether or not ships overlap
    this.name = "Carrier";
    this.size = 5;
    this.start = null; // Starting cell for ship; defaulted at null
    this.end = null; // Ending cell for ship; defaulted at null
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){
      this.hit_arr.push(""); // Array with empty strings; when ship is hit set the string to "hit"
  }
}

function Battleship(){
    this.cell_nums = []; // Used to test whether or not ships overlap
    this.name = "Battleship";
    this.size = 4;
    this.start = null; // Starting cell for ship; defaulted at null
    this.end = null; // Ending cell for ship; defaulted at null
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){ // Array with empty strings; when ship is hit set the string to "hit"
      this.hit_arr.push("");
  }
}

function Cruiser(){
    this.cell_nums = []; // Used to test whether or not ships overlap
    this.name = "Cruiser";
    this.size = 3;
    this.start = null; // Starting cell for ship; defaulted at null
    this.end = null; // Ending cell for ship; defaulted at null
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){ // Array with empty strings; when ship is hit set the string to "hit"
      this.hit_arr.push("");
  }
}

function Submarine(){
    this.cell_nums = []; // Used to test whether or not ships overlap
    this.name = "Submarine";
    this.size = 3;
    this.start = null; // Starting cell for ship; defaulted at null
    this.end = null; // Ending cell for ship; defaulted at null
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){ // Array with empty strings; when ship is hit set the string to "hit"
      this.hit_arr.push("");
  }
}

function Destroyer(){
    this.cell_nums = []; // Used to test whether or not ships overlap
    this.name = "Destroyer";
    this.size = 2;
    this.start = null; // Starting cell for ship; defaulted at null
    this.end = null; // Ending cell for ship; defaulted at null
    this.hit_arr = [];
    for(var i = 0; i < this.size; i++){ // Array with empty strings; when ship is hit set the string to "hit"
      this.hit_arr.push("");
  }
}


//Functions 
function setStart(ship,cell_num){ // Sets the specified ships starting cell
    ship.start = cell_num;
}

function setEnd(ship,cell_num){ // Sets the specified ships ending cell IF it is placed correctly
    var start = ship.start;
    if(isHorizontal(ship,start,cell_num) || isVertical(ship,start,cell_num)){ // Checks if placed correctly horizontally or vertically
        ship.end = cell_num; 
        return true;
    }
    else{
        return false;
    }
}

function isHorizontal(ship,cell1,cell2){ //Checks if ship is placed horizontal
    var size = ship.size-1;
    if((Math.abs(cell1-cell2) === size) && (Math.floor(cell1/10) === Math.floor(cell2/10))){ // Checks that the boat is placed in same row and with correct size
        return true;
    }
    return false;   
}

function isVertical(ship,cell1,cell2){ // Checks if ship is placed verticle 
    var size = ship.size-1;
    if(Math.abs((cell1-cell2)/10) === size){ // Checks that the boat is placed in same column and with correct size
        return true;
    }
    return false;
}



playerBoards.prototype.setShip = function(cell){ // Function that sets the ship onto the board (as of now it does it in order, but plan on letting user decide)
    if(this.shipCounter ===0){
        if(this.Carrier.start === null){ //The start is not set
            setStart(this.Carrier,cell);
            return;
        }
        else if(this.Carrier.start !== null){ // Start is set, end is not set
            setEnd(this.Carrier,cell);
            if(isSet(this.Carrier) && this.checkCells(this.Carrier)){ //If sucessfully set AND does not overlap
                this.shipArray[this.shipCounter] = this.Carrier; // Updates ship object array
                setImage(this.Carrier); // Sets image on board
                this.shipCounter++; // Ship sucessfully set; move on to next ship 
            }
            else{
                resetShip(this.Carrier); // NOT sucessfully set OR overlaps other ship then the ship is reset
                alert(this.shipNames[this.shipCounter] + " is not set!"); // Alerts user that ship was not set
            }
            return;
        }
             
    }
    if(this.shipCounter ===1){
        if(this.Battleship.start === null){
            setStart(this.Battleship,cell);
            return;
        }
        else if(this.Battleship.start !== null){
            setEnd(this.Battleship,cell);
             if(isSet(this.Battleship) &&this.checkCells(this.Battleship)){
                this.shipArray[this.shipCounter] = this.Battleship;
                setImage(this.Battleship);
                this.shipCounter++;
            }
            else{
                resetShip(this.Battleship);
                alert(this.shipNames[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    if(this.shipCounter ===2){
        if(this.Cruiser.start === null){
            setStart(this.Cruiser,cell);
            return;
        }
        else if(this.Cruiser.start !== null){
            setEnd(this.Cruiser,cell);
             if(isSet(this.Cruiser) && this.checkCells(this.Cruiser)){
                this.shipArray[this.shipCounter] = this.Cruiser;
                setImage(this.Cruiser);
                this.shipCounter++;
            }
            else{
                resetShip(this.Cruiser);
                alert(this.shipNames[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
     if(this.shipCounter ===3){
        if(this.Submarine.start === null){
            setStart(this.Submarine,cell);
            return;
        }
        else if(this.Submarine.start !== null){
            setEnd(this.Submarine,cell);
             if(isSet(this.Submarine) && this.checkCells(this.Submarine)){
                this.shipArray[this.shipCounter] = this.Submarine;
                setImage(this.Submarine);
                this.shipCounter++;
            }
            else{
                resetShip(this.Submarine);
                alert(this.shipNames[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
    if(this.shipCounter ===4){
        if(this.Destroyer.start === null){
            setStart(this.Destroyer,cell);
            return;
        }
        else if(this.Destroyer.start !== null){
            setEnd(this.Destroyer,cell);
             if(isSet(this.Destroyer) && this.checkCells(this.Destroyer)){
                this.shipArray[this.shipCounter] = this.Destroyer;
                setImage(this.Destroyer);
                this.shipCounter++;
            }
            else{
                resetShip(this.Destroyer);
                alert(this.shipNames[this.shipCounter] + " is not set!");
            }
            return;
        }
           
    }
    
    if(this.shipCounter === 5){ // All ships are set
        alert("All ships set");
    }
};

function resetShip(ship){ // Function to reset ships
    ship.start = null;
    ship.end = null;
    ship.cell_nums = [];
}

playerBoards.prototype.checkCells= function(ship){ // Function that checks if ships overlap
    var start;
     if(parseInt(ship.start) > parseInt(ship.end)){ // For consistency, start is set to lowest value and end is set to highest value
           start = parseInt(ship.end);
       }
       else{
           start = parseInt(ship.start);
       }
    for(var i = 0; i < ship.size; i++){ // Creates array of all the cells the ship is using
        ship.cell_nums[i] = start;
        if(isVertical(ship,ship.start,ship.end)){ // If ship is vertical, each cell is down the column (increment by 10)
            start += 10;
        }
        else{ //If ship is horizontal, each cell is across the row (increment by 1)
            start += 1; 
        }
    }
    //Nested for loop that checks if there is any overlap
    for(var j = 0 ; j < 5; j++){ // Loops through all the ship objects
        var shipCompare = this.shipArray[j]; 
        for(var k = 0; k < ship.size; k++){ // Loops through all the cells in specified ship
            for(var m = 0; m < shipCompare.size; m++){ // Loops through all the cells in every other ship
                if(ship.name !== shipCompare.name && ship.cell_nums[k] === shipCompare.cell_nums[m]){ //If the ships are not the same AND share a cell or more, then return false
                    return false;
                }
            }
        }
    }
    return true; //If no ships share the same cell, return true
};

function setHit_img(cell){
    var cell_id = document.getElementById(cell.toString());
    cell_id.style.background = "green";   
}

function setMiss_img(cell){
    var cell_id = document.getElementById(cell.toString());
    cell_id.style.background = "red";
}

function setImage(ship){ // Function to set image 
       var start;
       var cell;
       if(parseInt(ship.start) > parseInt(ship.end)){ // For consistency, start is set to lowest value and end is set to highest value
           start = parseInt(ship.end);
       }
       else{
           start = parseInt(ship.start);
       }
       
       if(isVertical(ship,ship.start,ship.end)){ // Checks orientation
            for(var i = 0; i < ship.size; i++){
                cell = document.getElementById(start.toString()); //Grabs the id of the board cells
                start = start + 10; // Increments cell by 10 because vertical orientation
                //Uses images based on ship
                if(ship.name === "Carrier"){
                    cell.style.backgroundImage = "url('././Carrier/c" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Battleship"){
                    cell.style.backgroundImage = "url('././Battleship/b" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Cruiser"){
                    cell.style.backgroundImage = "url('././Cruiser/cr" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Submarine"){
                    cell.style.backgroundImage = "url('././Submarine/s" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Destroyer"){
                    cell.style.backgroundImage = "url('././Destroyer/d" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
            }
        }
        
        if(isHorizontal(ship,ship.start,ship.end)){ // Checks orientation
            for(var i = 0; i < ship.size; i++){
                cell = document.getElementById(start.toString());
                start = start + 1; // Increments by 1 because horizontal orientation
                //Uses cell images based on ship
                if(ship.name === "Carrier"){
                    cell.style.backgroundImage = "url('././Carrier/ch" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Battleship"){
                    cell.style.backgroundImage = "url('././Battleship/bh" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Cruiser"){
                    cell.style.backgroundImage = "url('././Cruiser/crh" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Submarine"){
                    cell.style.backgroundImage = "url('././Submarine/sh" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
                if(ship.name === "Destroyer"){
                    cell.style.backgroundImage = "url('././Destroyer/dh" + (i+1) + ".png')";
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat";
                }
            }
        }
            
    }

function isSet(ship){ // Function to check if a ship is set
    if(ship.start!== null && ship.end!== null){
        return true;
    }
    return false;
}


//Board to fire and record hits and misses
function progressBoards(tableID,tableDataID) {
       this.table = this.makeTable(tableID,tableDataID);
       document.body.appendChild(this.table);
     
       //Ships
       this.Carrier = new Carrier();
       this.Battleship = new Battleship();
       this.Cruiser = new Cruiser();
       this.Submarine = new Submarine();
       this.Destroyer = new Destroyer();
       this.shipArray = [this.Carrier,this.Battleship,this.Cruiser,this.Submarine,this.Destroyer]; //Array that holds ship objects
       this.shipNames = ["Carrier","Battleship","Cruiser","Submarine","Destroyer"]; // Array that holds string names of ships
       this.shipCounter = 0; //Counts how many ships are sunk
}

progressBoards.prototype.makeTable = function(tableID, tableDataID) {

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
	var counter = 100; 
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

//Function to check hit
progressBoards.prototype.checkHit = function(cell){
    var ship;
    for(var i = 0; i < this.shipArray.length; i++){
        ship = this.shipArray[i];
        for(var j =0; j< ship.cell_nums.length; j++){
                if(ship.cell_nums[j] === cell){
                    var hit_index = ship.cell_nums.indexOf(cell);
                    if(ship.hit_arr[hit_index] === ""){
                        setHit_img(cell + 100);
                        alert(ship.name + " is hit!");
                        ship.hit_arr[hit_index] = "hit";
                        updateShips(this);
                        if(isSunk(ship)){
                            alert(ship.name + " is sunk!");
                        }
                        return;
                    }
                    
                    else{
                        
                        if(isSunk(ship)){
                            alert(ship.name + " is already sunk!");
                        }
                        else{
                            alert("ship already hit on that cell");
                        }
                        return;
                    }
                }
            }
        }
        
    alert("not hit");
    setMiss_img(cell + 100);
    
};


function isSunk(ship){
    var hit_counter = 0;
    
    for(var i = 0; i < ship.size; i++){
        if(ship.hit_arr[i] === "hit"){ //Check the hit array at all cells
            hit_counter++;
        }
    }
    if(hit_counter === ship.size){
        return true;
    }
    return false;
}

//Some functions change the ships and not the array of ship objects and vice versa
// So these functions are used to keep all the data in check 
function updateArray(board){ 
    board.shipArray[0] = board.Carrier;
    board.shipArray[1] = board.Battleship;
    board.shipArray[2] = board.Cruiser;
    board.shipArray[3] = board.Submarine;
    board.shipArray[4] = board.Destroyer;
   
}

function updateShips(board){
    board.Carrier = board.shipArray[0];
    board.Battleship = board.shipArray[1];
    board.Cruiser = board.shipArray[2];
    board.Submarine = board.shipArray[3];
    board.Destroyer = board.shipArray[4];
    
}