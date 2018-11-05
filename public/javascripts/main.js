const config = {
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
    AdminPermissions(user);
    if (user) {
        uid = user.uid;
        uemail = user.email;
    } else {
        window.location.href="/";
    }
});

function AdminPermissions(user) {
  if(user.email === "admin@tallerd.com"){
    var createUser = document.getElementById("myDIV");
    createUser.style.display = "block";
    document.getElementById("createUser").addEventListener('click', function(event) {
      var secondaryApp = firebase.initializeApp(config, "Secondary");
      const newUEmail = document.getElementById('correo-input').value;
      const newUPassword = document.getElementById('contraseña-input').value;
      secondaryApp.auth().createUserWithEmailAndPassword(newUEmail, newUPassword);
      secondaryApp.auth().signOut();
      document.getElementById('correo-input').value = "";
      document.getElementById('contraseña-input').value = "";
    });
  }
}
