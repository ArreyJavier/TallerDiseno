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

if(firebase.apps.length === 1){
  var secondaryApp = firebase.initializeApp(config, "create");
  var deleteApp = firebase.initializeApp(config, "delete");
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid = user.uid;
        uemail = user.email;
        if (uemail === "admin@tallerd.com"){
          var createUser = document.getElementById("myDIV");
          createUser.style.display = "block";
        }
    } else {
        window.location.href="/";
    }
});

document.getElementById("createUser").addEventListener('click', function(event) {
  const newUEmail = document.getElementById('correo-input').value;
  const newUPassword = document.getElementById('contraseña-input').value;
  secondaryApp.auth().createUserWithEmailAndPassword(newUEmail, newUPassword).then(function(value) {
    var user = secondaryApp.auth().currentUser;
    var dbUsuarios = firebase.database().ref("Usuarios/");
    dbUsuarios.child(user.uid).set({correo: newUEmail, contraseña: newUPassword})
    }, function(error) {
  });
  secondaryApp.auth().signOut();
  document.getElementById('correo-input').value = "";
  document.getElementById('contraseña-input').value = "";
  renderUsuarios();
});


var dbUsuarios = firebase.database().ref("Usuarios/");
var usuarios = [];
dbUsuarios.on("child_added", function(snapshot){
  var data = snapshot.val();
  usuario = {
      "correo": data.correo,
      "contraseña": data.contraseña
  };
  usuarios.push(usuario);
  renderUsuarios();
});

function deleteUsuario(index){
  var result = confirm("Quieres borrar?");
  if (result) {
    deleteApp.auth().signInWithEmailAndPassword(usuarios[index].correo,usuarios[index].contraseña).then(function(value) {
      var user = deleteApp.auth().currentUser;
      var dbUsuarios = firebase.database().ref("Usuarios/"+user.uid);
      dbUsuarios.remove();
      user.delete();
    });
    deleteApp.auth().signOut();
    usuarios.splice(index, 1);
    renderUsuarios();
  }
}

function appendUsuario(usuario, index){
    document.getElementById('usuarios').innerHTML += `
                        <tr id="usuario${index}">
                            <td> ${usuario.correo} </td>
                            <td> ${usuario.contraseña} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="initEditUsuario(${index})" class="btn-white btn btn-xs">Editar</button>
                                    <button onclick="deleteUsuario(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function renderUsuarios(){
    document.getElementById('usuarios').innerHTML = '';
    usuarios.forEach((usuario, i) => appendUsuario(usuario, i));
}
