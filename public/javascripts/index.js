document.getElementById('signOut').addEventListener('click', function(event) {
  firebase.auth().signOut();
  firebase.auth().onAuthStateChanged(function() {
    window.location.href="/";
  });
});
