// MARK: - Firebase
var assignedEntity = ""
const config = {
    apiKey: "AIzaSyBgf8Us4ZfzY0dPA8WvjFqBW86gcz8b8zA",
    authDomain: "drpr-seguridad2023-1.firebaseapp.com",
    projectId: "drpr-seguridad2023-1",
    storageBucket: "drpr-seguridad2023-1.appspot.com",
    messagingSenderId: "1070788088924",
    appId: "1:1070788088924:web:bf486c3b25d338b5760299",
    measurementId: "G-L319QKRH91",
    databaseURL: "https://drpr-seguridad2023-1-default-rtdb.firebaseio.com/"
  };

firebase.initializeApp(config);
firebase.analytics();


// MARK: Side Nav Bar
openNav.addEventListener("click", (e) => {
    document.getElementById("nav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
});

closeNav.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("nav").style.width = "0";
    document.getElementById("main").style.marginLeft = "";
});


// MARK: - Auth Top Bar
togglerUser.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("./index.html")
});


// MARK: - Auth Listener
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        var user = firebase.auth().currentUser;
    
        if(user != null){
            var email_id = user.email;
            document.getElementById("togglerUser").innerHTML =  email_id;
            console.log('usuario logueado');

            loadLoggedUserData();
        }
    } 
    else {
        console.log('usuario no logueado');
    }
});


function loadLoggedUserData() {
    var userId = firebase.auth().currentUser.uid;
  
    let route = firebase.database().ref('usersPivot').child(userId).once('value').then((snapshot) => {
      
      assignedEntity = (snapshot.val() && snapshot.val().assignedEntity) || 'Anonymous';
      console.log(assignedEntity);
      console.log("assignedEntity");
    });
}


// MARK: - Sign Out
function signOut() {
    firebase.auth().signOut();
    window.location.replace("./index.html")
}