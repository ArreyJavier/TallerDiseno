var config = {
    apiKey: "AIzaSyA0nnn3mnnUD8IeLOYV3qwhO2a46jQTHqg",
    authDomain: "taller-diseno.firebaseapp.com",
    databaseURL: "https://taller-diseno.firebaseio.com",
    projectId: "taller-diseno",
    storageBucket: "taller-diseno.appspot.com",
    messagingSenderId: "629295465332"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userName = user.email;
        document.getElementById("userName").innerHTML = userName;
    }
});

document.getElementById('signOut').addEventListener('click', function(event) {
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(function() {
        window.location.href="/";
    });
});