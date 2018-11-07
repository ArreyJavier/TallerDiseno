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

var internosFirebase = []

internosRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(internoSnapshot) {

		var trabajadorInterno 	= internoSnapshot.val();
		tmpInterno 				= {}
		tmpInterno['interno'] 	= trabajadorInterno.nombre;
		tmpInterno['cedula'] 	= trabajadorInterno.cedula;

		internosFirebase.push(tmpInterno);
	});
});

console.log(internosFirebase);

var internos = [
	{
		"interno": "Juan Gomez Mansilla",
		"cedula": "18536753-3"
	},
	{
		"interno": "Ignacio Rosas García",
		"cedula": "18548032-1"
	},
	{
		"interno": "Gustavo Gatica Soto",
		"cedula": "16345940-K"
	},
];
console.log(internos)

function addInterno(){
	interno = {
		"interno": "",
		"cedula": ""
	};
	interno.interno = document.getElementById("interno-input").value
	interno.cedula = document.getElementById("cedula-input").value

	document.getElementById("interno-input").value = '';
	document.getElementById("cedula-input").value = '';

	internos.push(interno);
	renderInternos();
}

function deleteInterno(index){
	internos.splice(index, 1);
	renderInternos();
}

function appendInterno(interno, index){
	document.getElementById('internos').innerHTML += `
						<tr id="interno${index}">
							<td> ${interno.interno} </td>
							<td> ${interno.cedula} </td>
							<td class="text-right">
								<div class="btn-group">
									<button onclick="initEditinterno(${index})" class="btn-white btn btn-xs">Editar</button>
									<button onclick="deleteinterno(${index})" class="btn-danger btn btn-xs">Delete</button>
								</div>
							</td>
						</tr>`;
}

function initEditInterno(index){
	document.getElementById(`interno${index}`).innerHTML = `
						<tr id="interno${index}">
						<td><input type="text" id="interno-field" value="${internos[index].interno}" class="form-control"></td>
						<td><input type="text" id="cedula-field" value="${internos[index].cedula}" class="form-control"></td>
							<td class="text-right">
								<div class="btn-group">
									<button onclick="executeEditInterno(${index})" class="btn-primary btn btn-xs">Guardar</button>
								</div>
							</td>
						</tr>`;

}
function executeEditInterno(index){
	internos[index] = {
		"interno": document.getElementById("interno-field").value,
		"cedula": document.getElementById("cedula-field").value
	}
	renderInternos();
}

function renderInternos(){
	document.getElementById('internos').innerHTML = '';
	internos.forEach((interno, i) => appendInterno(interno, i));
}

renderInternos();
