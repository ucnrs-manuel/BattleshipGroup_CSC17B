//login function
function login(username, password){
  //Checking login
  var user = verify(username, password);
  if(user == undefined)
    return false;

  str = JSON.stringify(user);
  localStorage.setItem("Info", str);
  return true;

  }


//Log in function
function verifyLogin(){
  var str = window.localStorage.getItem("Login");

    if(str != null){
      var login = JSON.parse(str);

      var user = verify(login.username, login.password);

      //check user
      if(user == undefined){
        return false;
      }else return true;
    }else return false;
}
//Function to verify
function verify(username, password){
  // load in the information for user
  var str = window.localStorage.getItem("Users");
  var users;

  if(str != null){
    users = JSON.parse(str);
  }
  else{
    users = [];
  }

  console.log(users);

  var ind = -1;
  //Checking username match in local storage
  for(var i = 0; i < users.length; i++){
    if(users[i].username == username)
    ind = i;
  }

  if(ind < 0){
    alert("Incorrect username + password combination");
    return;
  }

  //check password in local storage
  if(users[ind].password != password){
    alert("Incorrect username + password combination");
    return;
  }

  return users[ind];
}



  //logout function
  function logout(){
    localStorage.removeItem("Info");
  }
