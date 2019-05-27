firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    } else {
        window.location.replace("login.html")
    }
  });

const currentUser = localStorage.getItem("currentUser");
const loader = document.querySelector(".loader");
const name = document.getElementById("name");
const balance = document.getElementById("balance");

const user = firebase.database().ref("users/"+currentUser);
user.on("value", function(snapshot){
    name.innerText = "Hi, " + snapshot.child("firstname").val() + " " + snapshot.child("lastname").val();
    balance.innerText = "Balance: shs." + snapshot.child("accBalance").val();

    loader.className += " hidden";
  })

function apply(){
    const loanAmount = document.querySelector("#amount");
    const _loanAmount = loanAmount.options[loanAmount.selectedIndex].text;

    const loanTerm = document.querySelector("#loanTerm");
    const _loanTerm = loanTerm.options[loanTerm.selectedIndex].text;

    const purpose = document.querySelector("#purpose");
    const _purpose = purpose.options[purpose.selectedIndex].text;

    const repaymentDay = document.querySelector("#repaymentDay");
    const _repaymentDay = repaymentDay.value;

    const title = document.querySelector("#title");
    const _title = title.options[title.selectedIndex].text;

    const firstname = document.querySelector("#firstname");
    const _firstname = firstname.value; 

    const surname = document.querySelector("#surname");
    const _surname = surname.value;

    const dateOfBirth = document.querySelector("#dateOfBirth");
    const _dateOfBirth = dateOfBirth.value;


    const email = document.querySelector("#email");
    const _email = email.value;

    const confirmEmail = document.querySelector("#confirmEmail");
    const _confirmEmail = confirmEmail.value;

    const mobileNumber = document.querySelector("#mobileNumber");
    const _mobileNumber = mobileNumber.value;

    const homeNumber = document.querySelector("#homeNumber");
    const _homeNumber = homeNumber.value;

    const workNumber = document.querySelector("#workNumber");
    const _workNumber = workNumber.value;

    const residentialStatus = document.querySelector("#residentialStatus");
    const _residentialStatus = residentialStatus.options[residentialStatus.selectedIndex].text;

    const postCode = document.querySelector("#postCode");
    const _postCode = postCode.value;

    const employmentType = document.querySelector("#employmentType");
    const _employmentType = employmentType.options[employmentType.selectedIndex].text;

    const paymentFrequency = document.querySelector("#paymentFrequency");
    const _paymentFrequency = paymentFrequency.options[paymentFrequency.selectedIndex].text;

    const monthlyIncome = document.querySelector("#monthlyIncome")
    const _monthlyIncome = monthlyIncome.value;

    const didAcceptTerms = document.querySelector("#didAcceptTerms");

    const communicationPrefs = document.querySelector("#communicationPrefs");


    if(!!_loanAmount && !!_loanTerm && !!_purpose && !!_repaymentDay && !!_title && !!_firstname &&
        !!_surname && !!_dateOfBirth && !!_email && !!_confirmEmail && !!_mobileNumber && !!_residentialStatus &&
        !!_postCode && !!_employmentType && !!_paymentFrequency && !!_monthlyIncome
        ){
            loader.classList.remove("hidden") 
            firebaseRef = firebase.database().ref("applications");
            console.log(currentUser);
            firebaseRef.child(currentUser).set({
                loanAmount,
                loanTerm,
                purpose,
                repaymentDay,
                title,
                firstname,
                surname,
                dateOfBirth,
                email,
                mobileNumber,
                residentialStatus,
                postCode,
                employmentType,
                paymentFrequency,
                monthlyIncome,
                didAcceptTerms
            })
                .then(function(){
                    console.log("Loan application success");
                    loader.className += " hidden";
                })
                .catch(function(error){
                    console.log(error.message);
                    loader.className += " hidden";
                });
                loader.className += " hidden";

        }else{
              
            console.log(_loanAmount, _loanTerm, _purpose, _repaymentDay, _title, _firstname, _surname,
                _dateOfBirth, _email, _confirmEmail, _mobileNumber, _homeNumber, _workNumber, _residentialStatus,
                _postCode, _employmentType, _paymentFrequency, _monthlyIncome);
            alert("Please fill in all the values");
        }
}