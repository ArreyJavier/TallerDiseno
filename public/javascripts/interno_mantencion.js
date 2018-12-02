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

function revisarDigito( dvr )
{	
	dv = dvr + ""	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{			
		return false;	
	}	
	return true;
}

function revisarDigito2( crut )
{	
	largo = crut.length;	
	if ( largo < 2 )	
	{		
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else		
		rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
	revisarDigito( dv );	

	if ( rut == null || dv == null )
		return 0	

	var dvr = '0'	
	suma = 0	
	mul  = 2	

	for (i= rut.length -1 ; i >= 0; i--)	
	{	
		suma = suma + rut.charAt(i) * mul		
		if (mul == 7)			
			mul = 2		
		else    			
			mul++	
	}	
	res = suma % 11	
	if (res==1)		
		dvr = 'k'	
	else if (res==0)		
		dvr = '0'	
	else	
	{		
		dvi = 11-res		
		dvr = dvi + ""	
	}
	if ( dvr != dv.toLowerCase() )	
	{			
		return false	
	}

	return true
}

function Rut(texto)
{	
	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{			
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{				
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);			

	if ( revisarDigito2(texto) )		
		return true;	

	return false;
}

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

	if ( (interno.nombre == "") || (interno.cedula == "") || (!Rut(interno.cedula)) ) {
		alert("Debe ingresar un nombre y una cédula válida.");
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




