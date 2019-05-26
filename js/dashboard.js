firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    } else {
        window.location.replace("login.html")
    }
  });

  const currentUser = localStorage.getItem("currentUser");
  const name = document.getElementById("user-name")
  const firebaseRef = firebase.database().ref("users/"+currentUser);
  const username = firebaseRef.child("firstname");
 
  // const transactions = firebase.database().ref("users/1/transactions")
  console.log("buddyUser", currentUser)

  username.on("value", function(snapshot){
    name.innerText = "Hi, " + snapshot.val();
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
  })

function logout(){
    firebase.auth().signOut()
        .then(console.log("logged out"))
}