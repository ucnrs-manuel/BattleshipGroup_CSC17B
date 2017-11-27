function controller(){
    this.shipCounter = 0;
    this.shipImg = ["url('././Carrier/carrier.png')","url('././Battleship/battleship.png')","url('././Cruiser/cruiser.png')","url('././Destroyer/destroyer.png')","url('././Submarine/submarine.png')"];
    
};

controller.prototype.click = function(){
    if(this.shipCounter === 4){
        this.shipCounter = 0;
        return;
    }
    else{
        this.shipCounter++;
    }
};

controller.prototype.display = function(){
    document.write;
};