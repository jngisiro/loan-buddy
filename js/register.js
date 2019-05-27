window.addEventListener("load", function(){
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
})

const notice = document.querySelector(".notice");

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
            notice.innerText = "Passowrds do not match";
            notice.style.visibility = "visible";
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
                        localStorage.setItem("currentUser", username)

                    })
                    .catch(function(error){
                        loader.className += " hidden"
                        notice.innerText = "User already exists";
                        notice.style.visibility = "visible";
                    });
                    
                    // firebase.auth().signOut()
                    //     .then(console.log("logged out"));
                    // window.location.replace("dashboard.html");

                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    loader.className += " hidden"
                    notice.innerText = errorMessage;
                    notice.style.visibility = "visible";
                });
            
        }
    }
    else{
        notice.innerText = "Please fill in all the values";
        notice.style.visibility = "visible";
    }
}