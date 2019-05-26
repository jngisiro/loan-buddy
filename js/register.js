window.addEventListener("load", function(){
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
})

function registerUser(){
    const loader = document.querySelector(".loader");
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if(firstname != "" && lastname != "" && username != "" && email != "" && password != "" && confirmPassword != ""){
        if(password != confirmPassword){
            alert("Passwords do not match");
        }
        else{
            loader.classList.remove("hidden");
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser){
                    console.log(firebaseUser.user.email);
                    firebase.database().ref("users/"+username).set({
                        uid : firebaseUser.user.uid,
                        firstname : firstname,
                        lastname : lastname,
                        email : email,
                        accBalance : 0
                    })
                    .then(function(){
                        loader.className += " hidden"
                        console.log("User successfully added to the database");
                    })
                    .catch(function(error){
                        loader.className += " hidden"
                        console.log(error.message);
                    });
    
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    loader.className += " hidden"
                    console.log(errorMessage)
                });
        }
    }
    else{
        alert("Please fill in all the values");
    }
}