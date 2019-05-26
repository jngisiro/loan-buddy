firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.replace("dashboard.html")
    } else {
      
    }
  });

function loginUser(){
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        console.log("error: ", errorMessage);
      });
}