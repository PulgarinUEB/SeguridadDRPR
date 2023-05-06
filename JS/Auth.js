// MARK: Constants
const LIMIT_FAILED_ATTEMPTS = 5;

// MARK: - Authentication
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        var user = firebase.auth().currentUser;
        window.location.href = "./cifradoAfin.html";
    } 
});


// MARK: - User Log In
async function login(){

    const ipAddress = getIpAddress();

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    // Validating max failed attempts
    const isBlocked = await checkFailedAttempts(ipAddress);
    if (isBlocked) {
        // bloquear cuenta durante 30 minutos
        alert('Ha alcanzado el límite de intentos fallidos. Intente nuevamente más tarde.');
        return;
    }
    else {
        console.log('Se puede loguear :D');
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        
            window.alert("Error : " + errorMessage);
            updateFailedAttempts(ipAddress);
        });
    }
}


// MARK: - Get IP Address
function getIpAddress() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.ipify.org?format=json', false);
    xhr.send();
    
    return JSON.parse(xhr.responseText).ip.replace(/\./g, '');
}

// MARK: - Failed Attempts Counter
async function checkFailedAttempts(ip) {
    const failedAttemptsRef = firebase.database().ref(`failed_attempts/${ip}`);
    const snapshot = await failedAttemptsRef.once('value');
    const data = snapshot.val();
    if (snapshot.exists()) {
        console.log("Failed attempts: " + data.count);

        const timestamp = snapshot.val().last_attempt;
        const date = new Date(timestamp);
        console.log("Last attempt: " + date.toLocaleString());
    }

    if (data && data.count >= LIMIT_FAILED_ATTEMPTS && (Date.now() - data.last_attempt) < (30 * 60 * 1000)) { return true; }
    else {
        if (data && data.count >= LIMIT_FAILED_ATTEMPTS && (Date.now() - data.last_attempt) >= (30 * 60 * 1000)) { resetFailedAttempts(ip); }
        return false;
    }
}

  
function updateFailedAttempts(ip) {
    const failedAttemptsRef = firebase.database().ref(`failed_attempts/${ip}`);
    failedAttemptsRef.once('value').then(snapshot => {
        const data = snapshot.val() || { count: 0 };
        data.count++;
        data.last_attempt = Date.now();
        failedAttemptsRef.set(data);
    });
}

function resetFailedAttempts(ip) {
    console.log('Resetting failed attempts...');
    const failedAttemptsRef = firebase.database().ref(`failed_attempts/${ip}`);
    failedAttemptsRef.set(null);
}
