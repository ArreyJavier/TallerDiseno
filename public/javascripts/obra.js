const config = {
    apiKey: "AIzaSyA0nnn3mnnUD8IeLOYV3qwhO2a46jQTHqg",
    authDomain: "taller-diseno.firebaseapp.com",
    databaseURL: "https://taller-diseno.firebaseio.com",
    projectId: "taller-diseno",
    storageBucket: "taller-diseno.appspot.com",
    messagingSenderId: "629295465332"
};

firebase.initializeApp(config); 

var rootRef = firebase.database().ref();
var dbObras = rootRef.child("Obras/");

var obras = [];
 
dbObras.on("child_added", function(snapshot){
  var data = snapshot.val();
    obra = {
        "key" : data.key,
        "obra": data.obra,
        "descripcion": data.descripcion,
        "cliente" : data.cliente,
        "fechaIni" : data.fechaIni,
        "fechaFin" : data.fechaFin
        };
      obras.push(obra);
   
  renderObras();
});

dbObras.on("child_changed", function(snapshot){
    var data = snapshot.val();
    var obrasList = obras.length;
    for (i = 0; i < obrasList; i++) {
        if (obras[i].key == data.key) {
            obraDb = {
                "key" : data.key,
                "obra": data.obra,
                "descripcion": data.descripcion,
                "cliente" : data.cliente,
                "fechaIni" : data.fechaIni,
                "fechaFin" : data.fechaFin
                };
            obras.splice(i,1);
            obras.splice(i,0,obraDb);
        }
    }
    renderObras();
  });

dbObras.on("child_removed", function(snapshot){
    var data = snapshot.val();
    var obrasList = obras.length;
    for (i = 0; i < obrasList - 1; i++) {
        console.log(obras[i].obra)
        if (obras[i].key == data.key) {
            obraDb = {
                "key" : data.key,
                "obra": data.obra,
                "descripcion": data.descripcion,
                "cliente" : data.cliente,
                "fechaIni" : data.fechaIni,
                "fechaFin" : data.fechaFin
                };
            obras.splice(i,1);
        }
    }
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
    obra.obra = document.getElementById("obra-input").value
    obra.descripcion = document.getElementById("descripcion-input").value
    obra.cliente = document.getElementById("cliente-input").value
    obra.fechaIni = document.getElementById("fechaIni-input").value
    obra.fechaFin = document.getElementById("fechaFin-input").value

    document.getElementById("obra-input").value = '';
    document.getElementById("descripcion-input").value = '';
    document.getElementById("cliente-input").value = '';
    document.getElementById("fechaIni-input").value = '';
    document.getElementById("fechaFin-input").value = '';

    var addRef = firebase.database().ref().child('Obras/')

    var newObraKey = addRef.push().key;
    console.log

    var obrasListLength = obras.length;
    console.log("list" + obrasListLength)

   updates = {
    key : newObraKey,
    obra: obra.obra,
    descripcion: obra.descripcion,
    cliente: obra.cliente,
    fechaIni: obra.fechaIni,
    fechaFin: obra.fechaFin
    }

    addRef.child(newObraKey).update(updates)

    renderObras();
}


function deleteObra(index){
    var result = confirm("Want to delete?");
    if (result) {
    //Logic to delete the item
    var adaRef = firebase.database().ref('Obras/'+obras[index].key);
    obras.splice(index, 1);
    adaRef.remove().then(function() {
        console.log("Remove succeeded.")
    }).catch(function(error) {
        console.log("Remove failed: " + error.message)
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
    obras[index] = {
        "key" : obras[index].key,
        "obra": document.getElementById("obra-field").value,
        "descripcion": document.getElementById("descripcion-field").value,
        "cliente": document.getElementById("cliente-field").value,
        "fechaIni": document.getElementById("fechaIni-field").value,
        "fechaFin": document.getElementById("fechaFin-field").value
    }
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

    var ObrasDb = firebase.database().ref("Obras/");
    ObrasDb.child(obras[index].key).update({
        key : obras[index].key,
        obra: obra.obra,
        descripcion: obra.descripcion,
        cliente: obra.cliente,
        fechaIni: obra.fechaIni,
        fechaFin: obra.fechaFin
    }) 


    renderObras();
}

function renderObras(){
    document.getElementById('obras').innerHTML = '';
    obras.forEach((obra, i) => appendObra(obra, i));
}

renderObras();
