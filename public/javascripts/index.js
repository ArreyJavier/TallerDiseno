document.getElementById('signOut').addEventListener('click', function(event) {
  firebase.auth().signOut();
  firebase.auth().onAuthStateChanged(function() {
    window.location.href="/";
  });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userName = user.email;
        document.getElementById("userName").innerHTML = userName;
    }
});
