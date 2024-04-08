////regular expression for email and password
var patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var patternPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,15}$/;

// localStorage.clear();//***********first time of testing****************** */

//// check for login form
var userEmail = document.getElementById("userEmail");
var emailError = document.getElementById("emailError");
var loginPassword = document.getElementById("loginPassword");
var loginPasswordError = document.getElementById('loginPasswordError');
var emailNotFound = document.getElementById("emailNotFound");
var loginPasswordNotFound = document.getElementById("loginPasswordNotFound");
function checkError(e) {
    ///////////get data from localstorage and check if user found 
    var allUsers = localStorage.getItem('users');
    var allUsersObject = JSON.parse(allUsers);
    var check = 0;
    if (localStorage.users != null) {
        if(userEmail.value == allUsersObject[0].email && loginPassword.value == allUsersObject[0].password)
        {
            window.open("Admin.html", "_self");
            localStorage.userNow=0;
        }
        for (i = 1; i < allUsersObject.length; i++) {
            if (userEmail.value == allUsersObject[i].email && loginPassword.value == allUsersObject[i].password) {
                emailNotFound.hidden = true;
                localStorage.userNow=i;
                check++;
                break;
            } else {
                if (userEmail.value == allUsersObject[i].email && loginPassword.value != allUsersObject[i].password) {
                    loginPasswordNotFound.hidden = false;
                    emailNotFound.hidden = true;
                    loginPasswordError.hidden = true;
                    break;
                } else { loginPasswordNotFound.hidden = true };
                if (userEmail.value != allUsersObject[i].email && loginPassword.value != allUsersObject[i].password) {
                    emailNotFound.hidden = false;
                } else { emailNotFound.hidden = true; }
            }
        }
    } else {
        e.preventDefault;
        emailNotFound.hidden = false;
    }
    if (check != 0) {
        return;
    } else { e.preventDefault(); }


}
////check for registraion form
var idErorr = document.getElementById("idErorr");
var userID = document.getElementById("userID");
var userPassword = document.getElementById("userPassword");
var passwordErorr = document.getElementById("passwordErorr");
var userPassword2 = document.getElementById("userPassword2");
var passwordErorr2 = document.getElementById("passwordErorr2");
var idExist = document.getElementById("idExist");
function checkError2(e) {
    var errorNumber = 0;
    if (!patternEmail.test(userID.value)) {
        idErorr.hidden = false;
        errorNumber++;
    }
    else { idErorr.hidden = true; }
    if (!patternPassword.test(userPassword.value)) {
        passwordErorr.hidden = false;
        errorNumber++;
    } else { passwordErorr.hidden = true; }
    if (userPassword2.value != userPassword.value) {
        passwordErorr2.hidden = false;
        errorNumber++;
    } else { passwordErorr2.hidden = true; }
    if (errorNumber != 0) {
        e.preventDefault();
        return;
    }
    ////*********************************************************** */
    ///check if user is exist 
    var allUsers = localStorage.getItem('users');
    var allUsersObject = JSON.parse(allUsers);
    if (localStorage.users != null) {
        for (i = 0; i < allUsersObject.length; i++) {
            if (userID.value == allUsersObject[i].email) {
                idExist.hidden = false;
                e.preventDefault();
                return;
            } else { idExist.hidden = true; }
        }
    }

    ////////////////////////////////////*************************** */
    //////////save Data from registration form in localStorage
    var counter;
    var newUsersData;
    if (localStorage.users != null) {
        newUsersData = JSON.parse(localStorage.users)
        counter=newUsersData.length;
    } else {
         newUsersData = []; 
         counter=0;
        }
    let newUser = {
        userid:counter,
        email: userID.value,
        password: userPassword.value
    }
    newUsersData.push(newUser);
    localStorage.setItem('users', JSON.stringify(newUsersData));
    ////*************************************************************** */

}
