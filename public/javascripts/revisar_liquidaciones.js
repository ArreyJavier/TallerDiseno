var config = {
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
/*
var internos = [];
var db = firebase.database();
db.ref('/Trabakadores/Internos').once('value').then(snapshot => {
    internos = snapshot.val();
    renderInternos(internos);
});
*/


var rootRef 		= firebase.database().ref();
var internosRef 	= rootRef.child("Trabajadores/Internos");
var internos 		= [];

internosRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(internoSnapshot) {

		var trabajadorInterno 	= internoSnapshot.val();
		tmpInterno 				= {};
		tmpInterno['key'] 		= trabajadorInterno.key;
		tmpInterno['nombre'] 	= trabajadorInterno.nombre;
		tmpInterno['cedula'] 	= trabajadorInterno.cedula;

		internos.push(tmpInterno);
	});
	renderInternos(internos);
});


function filterByLiquidacion(internos){
    filter = document.getElementById("i_trabajador_filter");
    filterKey = filter.value;
    console.log("key" , filterKey);
    filteredInternos = internos.filter(interno => interno.nombre.toLowerCase().includes(filterKey.toLowerCase()));
    renderInternos(filteredInternos);
}
document.getElementById("i_trabajador_filter").addEventListener('change', function(){
    console.log("halå");
    filterByLiquidacion(internos)
});
document.getElementById("i_trabajador_filter").addEventListener('keyup', function(){
    console.log("halå");
    filterByLiquidacion(internos)
});

function appendInterno(interno, index){
	document.getElementById('internos').innerHTML += `
						<tr id="interno${index}">
							<td> ${interno.nombre} </td>
							<td> ${interno.cedula} </td>
							<td class="text-right">
								<div class="btn-group">
                                <button onclick="redirect(${index})" class="btn-white btn btn-xs">Ver liquidaciones</button>
								</div>
							</td>
						</tr>`;
}

function redirect(index){
    localStorage.setItem("interno", internos[index].key);
    location.href = "/index#/index/liquidacion_internos";
}

function renderInternos(internos){
	document.getElementById('internos').innerHTML = '';
	internos.forEach((interno, i) => appendInterno(interno, i));
}

renderInternos(internos);




