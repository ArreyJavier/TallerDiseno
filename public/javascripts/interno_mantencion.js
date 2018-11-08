/*
* config van las credenciales para meterce a firebase
* firebase.initiateApp(config) enchufa firebase al js
* internosRef es la ruta de la tabla donde estoy guardando los trabajadores (ver link)
* https://console.firebase.google.com/u/0/project/taller-diseno/database/taller-diseno/data
* la funcion snapshot.foreach recorre los "child" de la tabla y le extraigo los datos
* con esto deberiamos poder comenzar a conversar con la DB de forma mas fluida
* notar que "internosFirebase", devuelve exactamente lo mismo que "internos" por consola, demostrando que funciona.
*/
var config = {
	apiKey: "AIzaSyA0nnn3mnnUD8IeLOYV3qwhO2a46jQTHqg",
	authDomain: "taller-diseno.firebaseapp.com",
	databaseURL: "https://taller-diseno.firebaseio.com",
	projectId: "taller-diseno",
	storageBucket: "taller-diseno.appspot.com",
	messagingSenderId: "629295465332"
};
firebase.initializeApp(config);

var rootRef 		= firebase.database().ref();
var internosRef 	= rootRef.child("Trabajadores/Internos");
var internos 		= [];

internosRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(internoSnapshot) {

		var trabajadorInterno 	= internoSnapshot.val();
		tmpInterno 				= {}
		tmpInterno['key'] 		= trabajadorInterno.key;
		tmpInterno['nombre'] 	= trabajadorInterno.nombre;
		tmpInterno['cedula'] 	= trabajadorInterno.cedula;

		internos.push(tmpInterno);
	});
	renderInternos();
});


function addInterno(){
	interno = {
		"nombre": "",
		"cedula": ""
	};
	interno.nombre 	= document.getElementById("interno-input").value
	interno.cedula 	= document.getElementById("cedula-input").value

	if ( (interno.nombre == "") || (interno.cedula == "") ) {
		alert("Todos los campos deben ser rellenados.");
		return false;
	}
	else{
		document.getElementById("interno-input").value 	= '';
		document.getElementById("cedula-input").value 	= '';

		var newInternoKey = internosRef.push().key;
		
		newInterno = {
			'key'		: newInternoKey,
			'cedula' 	: interno.cedula,
			'nombre'	: interno.nombre 
		}
		internosRef.child(newInternoKey).update(newInterno);
		interno.key = newInternoKey;
		internos.push(interno);
		console.log(internos);

		document.getElementById('created_successfully').innerHTML += `
		<div class="alert alert-success" role="alert">
			Se agregaron exitosamente los datos.
		</div>
		`;
		var fade_out = function() {
			$("#created_successfully").fadeOut().empty();
		}
		setTimeout(fade_out, 5000);

	}
	renderInternos();
}

function deleteInterno(index){
	var result = confirm("¿Desea borrar este trabajador?");
	if (result) {
		console.log(internos[index]['key']);
		console.log(internos[index]['cedula']);
		deleteRef = internosRef.child(internos[index]['key'])

		deleteRef.remove();
		internos.splice(index, 1);
	}
	renderInternos();
}


function appendInterno(interno, index){
	document.getElementById('internos').innerHTML += `
						<tr id="interno${index}">
							<td> ${interno.nombre} </td>
							<td> ${interno.cedula} </td>
							<td class="text-right">
								<div class="btn-group">
									<button onclick="initEditInterno(${index})" class="btn-white btn btn-xs">Editar</button>
									<button onclick="deleteInterno(${index})" class="btn-danger btn btn-xs">Delete</button>
								</div>
							</td>
						</tr>`;
}

function initEditInterno(index){
	document.getElementById(`interno${index}`).innerHTML = `
						<tr id="interno${index}">
						<td><input type="text" id="interno-field" value="${internos[index].nombre}" class="form-control"></td>
						<td><input type="text" id="cedula-field" value="${internos[index].cedula}" class="form-control"></td>
							<td class="text-right">
								<div class="btn-group">
									<button onclick="executeEditInterno(${index})" class="btn-primary btn btn-xs">Guardar</button>
								</div>
							</td>
						</tr>`;

}
function executeEditInterno(index){
	console.log("AA")
	interno = {
		"nombre" 	: document.getElementById("interno-field").value,
		"cedula" 	: document.getElementById("cedula-field").value
	}

	if ((interno.nombre == "") || (interno.cedula == "")) {
		alert("Todos los campos deben ser rellenados.");
		return false;
	}
	else {
			console.log("AA")
		internos[index] = {
			"key" 		: internos[index].key,
			"nombre" 	: document.getElementById("interno-field").value,
			"cedula" 	: document.getElementById("cedula-field").value
		}
		console.log("AA")
		console.log(internos[index]);
		internosRef.child(internos[index].key).update({
			'key' 		: internos[index].key,
			'nombre' 	: interno.nombre,
			'cedula' 	: interno.cedula
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
	renderInternos();
}

function renderInternos(){
	document.getElementById('internos').innerHTML = '';
	internos.forEach((interno, i) => appendInterno(interno, i));
}

renderInternos();
