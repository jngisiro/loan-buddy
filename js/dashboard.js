firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    } else {
        window.location.replace("login.html")
    }
  });

  const loader = document.querySelector(".loader");
  const currentUser = localStorage.getItem("currentUser");
  const name = document.getElementById("name");
  const balance = document.getElementById("balance");
  const user = firebase.database().ref("users/"+currentUser);
  
  user.on("value", function(snapshot){
    name.innerText = "Hi, " + snapshot.child("firstname").val() + " " + snapshot.child("lastname").val();
    balance.innerText = "Balance: shs." + snapshot.child("accBalance").val();
    console.log(snapshot.child("accBalance").val());

    loader.className += " hidden";
  })
 
  console.log("buddyUser", currentUser)

function logout(){
    firebase.auth().signOut()
        .then(console.log("logged out"))
}