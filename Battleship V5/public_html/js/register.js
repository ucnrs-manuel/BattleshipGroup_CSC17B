function register(){
  var user = document.getElementById("username");
  var pass = document.getElementById("password");

  var uCheck = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!@#$%^&*])[A-Za-z\d?!@#$%^&*]{4,20}$/);
  var pCheck = new RegExp(/^.{4,15}$/);

  //Confirm if username meets requirement
  if(uCheck.exec(pass.value) == undefined){
    alert("Username doesn't meet requirement");
    return;
  }

  if(pCheck.exec(pass.value) == undefined){
    alert("Password doesn't meet requirement");
    return;
  }

  //User information
  var str = window.localStorage.getItem("Users");
        var users;

        if (str != null) {
          users = JSON.parse(str);
        } else {
          users = [];
        }

        // Check if the username is taken;
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == user.value) {
            alert("Username already taken");
            return;
          }
        }

        var user = {
          username: user.value,
          password: pass.value
        };
        users.push(user);

        // Save the users
        str = JSON.stringify(users);
        localStorage.setItem("Users", str);

        str = JSON.stringify(user);
        localStorage.setItem("Login", str);

        window.location.href = "play.html";
}
