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
            if(childSnapshot.val().manoDeObra == snapshotTrabajador.val().nombre){
                    tmpGastos 				= {};
                    tmpGastos['gasto'] 	    = childSnapshot.val().gasto;
                    tmpGastos['key'] = childSnapshot.val().key;
                    tmpGastos['manoDeObra'] = childSnapshot.val().manoDeObra;
                    tmpGastos['tipo'] 	= childSnapshot.val().tipo;
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
                            <td> ${gasto.manoDeObra} </td>
                            <td> ${gasto.tipo} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="showInfo(${index})" class="accordion btn-white btn btn-xs">Ver ingresos</button>                              
                                </div>
                            </td>
                         </tr>
                         <div id="gasto_id" class="panel">
                         <p id="gasta" class="panel_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                         </div>
                        `;
    var link = document.getElementsByClassName('panel_text');
    for (i = 0; i < link.length; i++) {
        console.log(link[i])
        var link_element = link[i]
        link_element.style.display = 'none';
    }
}
function showInfo(index){
    var panel = document.getElementById('gasta');
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