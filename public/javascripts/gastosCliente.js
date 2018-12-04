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

var clientID = localStorage.getItem("client");
var rootRef = firebase.database().ref();
var dbClientes = rootRef.child("Clientes/"+clientID);

var gastos = [];

var dbObras = rootRef.child("Obras/");
dbClientes.once('value').then(function (clientesSnapshot) {
    dbObras.once('value').then(function(snapshot) {
        snapshot.forEach(function (obrasSnapshot) {
            if(obrasSnapshot.val().cliente == clientesSnapshot.val().nombre) {
                var obraList = document.getElementById("obraGasto");
                var optionObra = document.createElement("option");
                optionObra.text = obrasSnapshot.val().obra;
                obraList.add(optionObra);
            }
        });
    });
});

dbClientes.once("value").then(function(snapshotClient){
    document.getElementById("title").innerHTML = snapshotClient.val().nombre;

    var rootRef = firebase.database().ref();
    var dbObras = rootRef.child("Obras/");
    dbObras.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.val().cliente == snapshotClient.val().nombre){
                childSnapshot.child("/gastos").forEach(function (superChildSnapshot) {
                    tmpGastos 				= {};
                    tmpGastos['key'] 		= superChildSnapshot.key;
                    tmpGastos['obra'] 	    = childSnapshot.val().obra;
                    tmpGastos['descripcion'] = superChildSnapshot.val().descripcion;
                    tmpGastos['monto'] 	= superChildSnapshot.val().monto;
                    gastos.push(tmpGastos);
                });
            }
        });
        renderGastos();
    });
});

function filterByObra(gastos){
    filter = document.getElementById("filter-obra");
    filterKey = filter.value;
    filteredGastos = gastos.filter(gasto => gasto.obra.toLowerCase().includes(filterKey.toLowerCase()));
    renderGastos2(filteredGastos);
}
document.getElementById("filter-obra").addEventListener('change', function(){
    filterByObra(gastos)
});
document.getElementById("filter-obra").addEventListener('keyup', function(){
    filterByObra(gastos)
});

function addGasto(){

    var rootRef = firebase.database().ref();
    var dbObras = rootRef.child("Obras/");

    gasto = {
        "obra": "",
        "descripcion": "",
        "monto" : "",
    };

    gasto.obra = document.getElementById("obraGasto").value;
    gasto.descripcion = document.getElementById("descripcionGasto").value;
    gasto.monto = document.getElementById("montoGasto").value;

    if ((gasto.obra == "") || (gasto.descripcion == "") || (gasto.monto == "")) {
        alert("Todos los campos deben ser rellenados.");
        return false;
    }
    else {
        document.getElementById("obraGasto").value = '';
        document.getElementById("descripcionGasto").value = '';
        document.getElementById("montoGasto").value = '';


        dbObras.once('value').then(function(snapshot) {
            snapshot.forEach(function(obraSnapshot) {
                if(obraSnapshot.val().obra == gasto.obra){
                    var newGastoKey = dbObras.child(obraSnapshot.key+"/gastos").push().key;
                    updates = {
                        'key' : newGastoKey,
                        'descripcion': gasto.descripcion,
                        'monto': gasto.monto,
                    };
                    dbObras.child(obraSnapshot.key+"/gastos/"+ newGastoKey).update(updates);
                    gasto.key = newGastoKey;
                    gastos.push(gasto);

                    document.getElementById('created_successfully').innerHTML += `
                    <div class="alert alert-success" role="alert">
                    Agregó exitosamente los datos.
                    </div>
                    `;
                    var fade_out = function() {
                        $("#created_successfully").fadeOut().empty();
                    };
                    setTimeout(fade_out, 5000);
                }
                renderGastos();
            });
        });
    }
}


function appendGasto(gasto, index){
    document.getElementById('gastos').innerHTML += `
                        <tr id="gasto${index}">
                            <td> ${gasto.obra} </td>
                            <td> ${gasto.descripcion} </td>
                            <td> ${gasto.monto} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="deleteGasto(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function deleteGasto(index) {
    var result = confirm("Quieres borrar?");
    if (result) {
        var stopDelete = 0;
        //Logic to delete the item
        var dbObras = rootRef.child("Obras/");
        dbObras.once('value').then(function (snapshot) {
            snapshot.forEach(function (obrasSnapshot) {
                obrasSnapshot.child("/gastos").forEach(function (gastosSnapshot) {
                    if(gastosSnapshot.key == gastos[index].key && stopDelete == 0){
                            var adaRef = firebase.database().ref('Obras/'+ obrasSnapshot.key +"/gastos/"+gastos[index].key);
                            gastos.splice(index, 1);
                            stopDelete = 1;
                            adaRef.remove().then(function() {
                                console.log("Exito borrar.");
                                renderGastos();
                            }).catch(function(error) {
                                console.log("No podría borrar: " + error.message);
                            });
                    }
                });
            });
        });
    }
}

function renderGastos(){
    var total = 0;
    document.getElementById('gastos').innerHTML = '';
    gastos.forEach((gasto, i) => appendGasto(gasto, i));
    gastos.forEach((gasto) => total += parseInt(gasto.monto));
    document.getElementById("totalMonto").innerHTML = total;
}

function renderGastos2(gastos){
    var total = 0;
    document.getElementById('gastos').innerHTML = '';
    gastos.forEach((gasto, i) => appendGasto(gasto, i));
    gastos.forEach((gasto) => total += parseInt(gasto.monto));
    document.getElementById("totalMonto").innerHTML = total;
}

renderGastos();