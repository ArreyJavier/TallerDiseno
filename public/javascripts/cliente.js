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

var rootRef = firebase.database().ref();
var dbClientes = rootRef.child("Clientes/");

var clientes = [];

dbClientes.on("child_added", function(snapshot){
    var data = snapshot.val();
    cliente = {
        "key" : data.key,
        "nombre": data.nombre,
        "correo": data.correo
    };
    clientes.push(cliente);

    renderClientes();
});

dbClientes.on("child_changed", function(snapshot){
    var data = snapshot.val();
    var clientesList = clientes.length;
    for (i = 0; i < clientesList; i++) {
        if (clientes[i].key == data.key) {
            clienteDb = {
                "key" : data.key,
                "nombre": data.nombre,
                "correo": data.correo,
            };
            clientes.splice(i,1);
            clientes.splice(i,0,clienteDb);
        }
    }
    renderClientes();
});

dbClientes.on("child_removed", function(snapshot){
    var data = snapshot.val();
    var clientesList = clientes.length;
    for (i = 0; i < clientesList; i++) {
        if (clientes[i].key == data.key) {
            clienteDb = {
                "key" : data.key,
                "nombre": data.nombre,
                "correo": data.correo
            };
            clientes.splice(i,1);
        }
    }
    renderClientes();
});

function addCliente(){
    cliente = {
        "nombre": "",
        "correo": ""
    };
    cliente.nombre = document.getElementById("nombreC").value;
    cliente.correo = document.getElementById("correoC").value;

    if ((cliente.nombre == "") || (cliente.correo == "")) {
        alert("Todos los campos deben ser rellenados.");
        return false;
    }
    else {
        document.getElementById("nombreC").value = '';
        document.getElementById("correoC").value = '';

        var addRef = firebase.database().ref().child('Clientes/');
        var newClienteKey = addRef.push().key;

        updates = {
            key : newClienteKey,
            nombre: cliente.nombre,
            correo: cliente.correo
        };
        addRef.child(newClienteKey).update(updates);
        document.getElementById('created_successfully').innerHTML += `
        <div class="alert alert-success" role="alert">
        Agregó exitosamente los datos.
            </div>
        `;
        var fade_out = function() {
            $("#created_successfully").fadeOut().empty();
        }
        setTimeout(fade_out, 5000);
    }

    renderClientes();
}


function deleteCliente(index){
    var result = confirm("Quieres borrar?");
    if (result) {
        //Logic to delete the item
        var adaRef = firebase.database().ref('Clientes/'+clientes[index].key);
        clientes.splice(index, 1);
        adaRef.remove().then(function() {
            console.log("Exito borrar.")
        }).catch(function(error) {
            console.log("No podría borrar: " + error.message)
        });
    }
    renderClientes();
}

function appendCliente(cliente, index){
    document.getElementById('clientes').innerHTML += `
                        <tr id="cliente${index}">
                            <td> ${cliente.nombre} </td>
                            <td> ${cliente.correo} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="initEditCliente(${index})" class="btn-white btn btn-xs">Editar</button>
                                    <button onclick="deleteCliente(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function initEditCliente(index){
    document.getElementById(`cliente${index}`).innerHTML = `
                        <tr id="cliente${index}">
                        <td><input type="text" id="nombreC" value="${clientes[index].nombre}" class="form-control"></td>
                        <td><input type="text" id="correoC" value="${clientes[index].correo}" class="form-control"></td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="executeEditCliente(${index})" class="btn-primary btn btn-xs">Guardar</button>
                                </div>
                            </td>
                        </tr>`;


}
function executeEditCliente(index){
    cliente = {
        "nombre": "",
        "correo": "",
    };
    cliente.nombre = document.getElementById("nombreC").value;
    cliente.correo = document.getElementById("correoC").value;

    if ((cliente.nombre == "") || (cliente.correo == "")) {
        alert("Todos los campos deben ser rellenados.");
        return false;
    }
    else {
        clientes[index] = {
            "key" : clientes[index].key,
            "nombre": document.getElementById("nombreC").value,
            "correo": document.getElementById("correoC").value,
        };

        var ClientesDb = firebase.database().ref("Clientes/");
        ClientesDb.child(clientes[index].key).update({
            key : clientes[index].key,
            nombre: cliente.nombre,
            correo: cliente.correo,
        });
        document.getElementById('updated_successfully').innerHTML += `
        <div class="alert alert-success" role="alert">
        Actualización exitosa de los datos.
            </div>
        `;
        var fade_out = function() {
            $("#updated_successfully").fadeOut().empty();
        };
        setTimeout(fade_out, 5000);

    }

    renderClientes();
}

function renderClientes(){
    document.getElementById('clientes').innerHTML = '';
    clientes.forEach((cliente, i) => appendCliente(cliente, i));
}

renderClientes();
