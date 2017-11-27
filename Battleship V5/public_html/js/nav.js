function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("menuDiv").style.marginLeft = "250px";
    document.getElementById("menuIcon").style.display = "none";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("menuDiv").style.marginLeft= "0";
    document.getElementById("menuIcon").style.display = "block";
}
