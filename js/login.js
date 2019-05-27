window.addEventListener("load", function() {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.replace("dashboard.html");
  } else {
  }
});

const notice = document.querySelector(".notice");

function loginUser() {
  const loader = document.querySelector(".loader");
  const username = document.getElementById("username").value;
  const password = document.getElementById("user-password").value;
  localStorage.setItem("currentUser", username)

  if (username != "" && password != "") {
    loader.classList.remove("hidden");
    try{
      const email = firebase
      .database()
      .ref("users/" + username)
      .child("email");

      email.on("value", function(snapshot) {
        if(snapshot.val() === null){
          loader.className += " hidden";
          notice.innerText = "Username is not registered";
          notice.style.visibility = "visible";
        }
        firebase
          .auth()
          .signInWithEmailAndPassword(snapshot.val(), password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
  
            console.log("error: ", errorMessage);
            loader.className += " hidden";
            notice.innerText = "The password is incorrect"
            notice.style.visibility = "visible";
          });
      });
    }

    catch(e){
      console.log(e)
    }
  }

  else{
    notice.innerText = "Please enter a valid username and password";
    notice.style.visibility = "visible";
  }
}
