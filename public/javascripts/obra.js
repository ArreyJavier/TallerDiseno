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
var dbObras = rootRef.child("Obras/");
var obras = [];

dbObras.once('value').then(function(snapshot) {
    snapshot.forEach(function(obraSnapshot) {

        var sObra 	= obraSnapshot.val();
        tmpObras 				= {};
        tmpObras['key'] 		= sObra.key;
        tmpObras['obra'] 	    = sObra.obra;
        tmpObras['descripcion'] = sObra.descripcion;
        tmpObras['cliente'] 	= sObra.cliente;
        tmpObras['fechaIni'] 	= sObra.fechaIni;
        tmpObras['fechaFin'] 	= sObra.fechaFin;

        obras.push(tmpObras);
    });
    renderObras();
});

function addObra(){
    obra = {
        "obra": "",
        "descripcion": "",
        "cliente" : "",
        "fechaIni" : "",
        "fechaFin" : ""
    };
    obra.obra = document.getElementById("obra-input").value;
    obra.descripcion = document.getElementById("descripcion-input").value;
    obra.cliente = document.getElementById("cliente-input").value;
    obra.fechaIni = document.getElementById("fechaIni-input").value;
    obra.fechaFin = document.getElementById("fechaFin-input").value;

    if ((obra.obra == "") || (obra.descripcion == "") || (obra.cliente == "")  || !Date.parse(obra.fechaIni) || !Date.parse(obra.fechaFin)) {
        alert("Todos los campos deben ser rellenados.");
        return false;
    }
    else {
        document.getElementById("obra-input").value = '';
        document.getElementById("descripcion-input").value = '';
        document.getElementById("cliente-input").value = '';
        document.getElementById("fechaIni-input").value = '';
        document.getElementById("fechaFin-input").value = '';

        var newObraKey = dbObras.push().key;

    updates = {
        'key' : newObraKey,
        'obra': obra.obra,
        'descripcion': obra.descripcion,
        'cliente': obra.cliente,
        'fechaIni': obra.fechaIni,
        'fechaFin': obra.fechaFin
        };
        dbObras.child(newObraKey).update(updates);
        obra.key = newObraKey;
        obras.push(obra);


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

    renderObras();
}


function deleteObra(index){
    var result = confirm("Quieres borrar?");
    if (result) {
    //Logic to delete the item
    var adaRef = firebase.database().ref('Obras/'+obras[index].key);
    obras.splice(index, 1);
    adaRef.remove().then(function() {
        console.log("Exito borrar.")
    }).catch(function(error) {
        console.log("No podría borrar: " + error.message)
  });
    }
    renderObras();
}

function appendObra(obra, index){
    document.getElementById('obras').innerHTML += `
                        <tr id="obra${index}">
                            <td> ${obra.obra} </td>
                            <td> ${obra.descripcion} </td>
                            <td> ${obra.cliente} </td>
                            <td> ${obra.fechaIni} </td>
                            <td> ${obra.fechaFin} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="initEditObra(${index})" class="btn-white btn btn-xs">Editar</button>
                                    <button onclick="deleteObra(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function initEditObra(index){
    document.getElementById(`obra${index}`).innerHTML = `
                        <tr id="obra${index}">
                        <td><input type="text" id="obra-field" value="${obras[index].obra}" class="form-control"></td>
                        <td><input type="text" id="descripcion-field" value="${obras[index].descripcion}" class="form-control"></td>
                        <td><input type="text" id="cliente-field" value="${obras[index].cliente}" class="form-control"></td>
                        <td><input type="date" id="fechaIni-field" value="${obras[index].fechaIni}" class="form-control"></td>
                        <td><input type="date" id="fechaFin-field" value="${obras[index].fechaFin}" class="form-control"></td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="executeEditObra(${index})" class="btn-primary btn btn-xs">Guardar</button>
                                </div>
                            </td>
                        </tr>`;


}
function executeEditObra(index){
    obra = {
        "obra": "",
        "descripcion": "",
        "cliente" : "",
        "fechaIni" : "",
        "fechaFin" : ""
    };
    obra.obra = document.getElementById("obra-field").value
    obra.descripcion = document.getElementById("descripcion-field").value
    obra.cliente = document.getElementById("cliente-field").value
    obra.fechaIni = document.getElementById("fechaIni-field").value
    obra.fechaFin = document.getElementById("fechaFin-field").value

    if ((obra.obra == "") || (obra.descripcion == "") || (obra.cliente == "")  || !Date.parse(obra.fechaIni) || !Date.parse(obra.fechaFin)) {
        alert("Todos los campos deben ser rellenados.");
        return false;
    }
    else {
        obras[index] = {
            "key" : obras[index].key,
            "obra": document.getElementById("obra-field").value,
            "descripcion": document.getElementById("descripcion-field").value,
            "cliente": document.getElementById("cliente-field").value,
            "fechaIni": document.getElementById("fechaIni-field").value,
            "fechaFin": document.getElementById("fechaFin-field").value
        }
       
        var ObrasDb = firebase.database().ref("Obras/");
        ObrasDb.child(obras[index].key).update({
            key : obras[index].key,
            obra: obra.obra,
            descripcion: obra.descripcion,
            cliente: obra.cliente,
            fechaIni: obra.fechaIni,
            fechaFin: obra.fechaFin
        })
        document.getElementById('updated_successfully').innerHTML += `
        <div class="alert alert-success" role="alert">
        Actualización exitosa de los datos.
            </div>
        `;
        var fade_out = function() {
            $("#updated_successfully").fadeOut().empty();
          }
          setTimeout(fade_out, 5000); 

    }

    renderObras();
}

function renderObras(){
    document.getElementById('obras').innerHTML = '';
    obras.forEach((obra, i) => appendObra(obra, i));
}

renderObras();
