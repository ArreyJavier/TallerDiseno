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


var rootRef 		= firebase.database().ref();
var externosRef 	= rootRef.child("Trabajadores/ManoDeObra");
var externos 		= [];
var gastosRef 		= rootRef.child("Trabajadores/Gastos");
var gastos 			= [];

externosRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(externoSnapshot) {

		var trabajadorExterno 	= externoSnapshot.val();
		tmpExterno 				= {};
		tmpExterno['key'] 		= trabajadorExterno.key;
		tmpExterno['nombre'] 	= trabajadorExterno.nombre;
		tmpExterno['cedula'] 	= trabajadorExterno.cedula;

		externos.push(tmpExterno);
	});
	getManoDeObra()
});

gastosRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(gastoSnapshot) {

		var gastoExterno 		= gastoSnapshot.val();
		tmpGasto 				= {};
		tmpGasto['key'] 		= gastoExterno.key;
		tmpGasto['gasto'] 		= gastoExterno.gasto;
		tmpGasto['tipo'] 		= gastoExterno.tipo;
		tmpGasto['manoDeObra'] 	= gastoExterno.manoDeObra;

		gastos.push(tmpGasto);
	});
	renderInternos();
});

function getManoDeObra(){
	for (var i in externos){
		var option		= document.createElement("option");
		var textNode	= document.createTextNode(externos[i]['nombre']);
		option.appendChild(textNode)
		document.getElementById("mano-de-obra-select").appendChild(option);
	}
}

function addGasto(){
	gasto = {
		"gasto":		"",
		"tipo":			"",
		"manoDeObra":	""
	};
	gasto.gasto			= document.getElementById("gasto-input").value;
	gasto.tipo			= document.getElementById("tipo-gasto-select").value;
	gasto.manoDeObra	= document.getElementById("mano-de-obra-select").value;


	if ( gasto.gasto == "" )  {
		alert("Debe ingresar un gasto válida.");
		return false;
	}
	else{
		document.getElementById("gasto-input").value 	= '';

		var newGastoKey = gastosRef.push().key;
		
		newGasto = {
			'key'			: newGastoKey,
			'gasto'			: gasto.gasto,
			'tipo'			: gasto.tipo,
			'manoDeObra'	: gasto.manoDeObra
		};
		gastosRef.child(newGastoKey).update(newGasto);
		gasto.key = newGastoKey;
		gastos.push(gasto);
		console.log(gastos);

		document.getElementById('created_successfully').innerHTML += `
		<div class="alert alert-success" role="alert">
			Se agregaron exitosamente los datos.
		</div>
		`;
		var fade_out = function() {
			$("#created_successfully").fadeOut().empty();
		};
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


function appendGasto(gasto, index){
	document.getElementById('gastos').innerHTML += `
						<tr id="gasto${index}">
							<td> ${gasto.manoDeObra} </td>
							<td> ${gasto.gasto} </td>
							<td> ${gasto.tipo} </td>
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
	interno = {
		"nombre" 	: document.getElementById("interno-field").value,
		"cedula" 	: document.getElementById("cedula-field").value
	};

	if ((interno.nombre == "") || (interno.cedula == "")) {
		alert("Todos los campos deben ser rellenados.");
		return false;
	}
	else {
		internos[index] = {
			"key" 		: internos[index].key,
			"nombre" 	: document.getElementById("interno-field").value,
			"cedula" 	: document.getElementById("cedula-field").value
		};

		internosRef.child(internos[index].key).update({
			'key' 		: internos[index].key,
			'nombre' 	: interno.nombre,
			'cedula' 	: interno.cedula
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
	renderInternos();
}

function renderInternos(){
	document.getElementById('gastos').innerHTML = '';
	gastos.forEach((gasto, i) => appendGasto(gasto, i));
}

renderInternos();




