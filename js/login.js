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

function loginUser() {
  const loader = document.querySelector(".loader");
  const username = document.getElementById("username").value;
  const password = document.getElementById("user-password").value;
  localStorage.setItem("currentUser", username)

  if (username != "" && password != "") {
    loader.classList.remove("hidden");
    const email = firebase
      .database()
      .ref("users/" + username)
      .child("email");

    email.on("value", function(snapshot) {
      console.log(snapshot.val());
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
        });
    });
  }

  else{
    console.log("running");
  }
}
