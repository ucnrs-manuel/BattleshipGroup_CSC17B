//the model in MVC
function Board() {
	this.playerTable = this.makeTable("playerTable", "playerCell", "player");
	this.progressTable = this.makeTable("progressTable", "progressCell");

	document.body.appendChild(this.playerTable);
	document.body.appendChild(this.progressTable);
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
			tableData.className = "waterCell"
			tableData.id = tableDataID + counter++;
			tableData.addEventListener("click", this.changeColor);
			tableRow.appendChild(tableData);
		}
		table.appendChild(tableRow);
	}
	return table;
}

Board.prototype.changeColor = function() {
	this.style.backgroundImage = "none";
	this.style.backgroundColor = "blue";
}
