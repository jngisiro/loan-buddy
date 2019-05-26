firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    } else {
        window.location.replace("login.html")
    }
  });

  const name = document.getElementById("user-name")
  const firebaseRef = firebase.database().ref("users/1");
  const username = firebaseRef.child("name");
  
  const transactions = firebase.database().ref("users/1/transactions")

  username.on("value", function(snapshot){
    name.innerText = "Hi, " + snapshot.val();
  })

function logout(){
    firebase.auth().signOut()
        .then(console.log("logged out"))
}