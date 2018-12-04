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

var mTrabajadorID = localStorage.getItem("m_trabajador");
var rootRef = firebase.database().ref();
var dbMTrabajadores = rootRef.child("Trabajadores/ManoDeObra/"+mTrabajadorID);

var gastos = [];

dbMTrabajadores.once("value").then(function(snapshotTrabajador){
    document.getElementById("title").innerHTML = snapshotTrabajador.val().nombre;

    var rootRef = firebase.database().ref();
    var dbTrabajadoresGastos = rootRef.child("Trabajadores/Gastos/");
    dbTrabajadoresGastos.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            if((childSnapshot.val().manoDeObra == snapshotTrabajador.val().nombre) && childSnapshot.val().tipo == "Liquidación"){
                    tmpGastos 				= {};
                    tmpGastos['gasto'] 	    = childSnapshot.val().gasto;
                    tmpGastos['key'] = childSnapshot.val().key;
                    tmpGastos['manoDeObra'] = childSnapshot.val().manoDeObra;
                    tmpGastos['tipo'] 	= childSnapshot.val().tipo;
                    tmpGastos['fecha'] 	= childSnapshot.val().fecha;
                    tmpGastos['desc'] 	= childSnapshot.val().desc;
                    gastos.push(tmpGastos);
            }
        });
        renderGastos();
    });
});

function appendGasto(gasto, index){
    document.getElementById('gastos').innerHTML += `
                        <tr id="gasto${index}">
                            <td> ${gasto.gasto} </td>
                            <td> ${gasto.fecha} </td>
                            <td> ${gasto.manoDeObra} </td>
                            <td> ${gasto.tipo} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="showInfo(${index})" class="accordion btn-white btn btn-xs">Detalles</button>                              
                                </div>
                            </td>
                         </tr>
                         <div id="gasto_id" class="panel">
                         <p id="gasto_desc${index}" class="panel_text"> ${gasto.desc} </p>
                         </div>
                        `;
    var link = document.getElementsByClassName('panel_text');
    for (i = 0; i < link.length; i++) {
        var link_element = link[i]
        link_element.style.display = 'none';
    }
}
function showInfo(index){
    var panel = document.getElementById('gasto_desc'+index);
        if (panel.style.display === "block") {
                panel.style.display = "none";
        } else {
                panel.style.display = "block";
        }
}


function renderGastos(){
    document.getElementById('gastos').innerHTML = '';
    gastos.forEach((gasto, i) => appendGasto(gasto, i));
}


renderGastos();
