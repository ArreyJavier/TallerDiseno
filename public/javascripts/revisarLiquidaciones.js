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
var mTrabajadorRef 	= rootRef.child("Trabajadores/ManoDeObra");
var mTrabajadores 		= [];

mTrabajadorRef.once('value').then(function(snapshot) {
	snapshot.forEach(function(mTrabajadorSnapshot) {

		var mTrabajador 	= mTrabajadorSnapshot.val();
		tmpmTrabajador 				= {};
		tmpmTrabajador['key'] 		= mTrabajador.key;
		tmpmTrabajador['nombre'] 	= mTrabajador.nombre;
		tmpmTrabajador['cedula'] 	= mTrabajador.cedula;

		mTrabajadores.push(tmpmTrabajador);
	});
	renderMTrabajadores(mTrabajadores);
});


function filterByLiquidacion(mTrabajadores,event){
    filter = document.getElementById("m_trabajador_filter");
    filterKey = filter.value;
    filteredMTrabajadores = mTrabajadores.filter(mTrabajador => mTrabajador.nombre.toLowerCase().includes(filterKey.toLowerCase()));
        if (filteredMTrabajadores.length == 0 && event == "keyup") {
            alert("Trabajador no existe.");
            return false;
        } else {
            renderMTrabajadores(filteredMTrabajadores);
    }

}
document.getElementById("m_trabajador_filter").addEventListener('change', function(){
    var event = 'change'
    filterByLiquidacion(mTrabajadores,event)
});
document.getElementById("m_trabajador_filter").addEventListener('keyup', function(){
    var event = 'keyup'
    filterByLiquidacion(mTrabajadores,event)
});

function appendMTrabajador(mTrabajador, index){
	document.getElementById('m_trabajador').innerHTML += `
						<tr id="interno${index}">
							<td> ${mTrabajador.nombre} </td>
							<td> ${mTrabajador.cedula} </td>
							<td class="text-right">
								<div class="btn-group">
                                <button onclick="redirect(${index})" class="btn-white btn btn-xs">Ver liquidaciones</button>
								</div>
							</td>
						</tr>`;
}

function redirect(index){
    localStorage.setItem("m_trabajador", mTrabajadores[index].key);
    location.href = "/index#/index/liquidacionMTrabajadores";
}

function renderMTrabajadores(mTrabajadores){
	document.getElementById('m_trabajador').innerHTML = '';
	mTrabajadores.forEach((mTrabajador, i) => appendMTrabajador(mTrabajador, i));
}

renderMTrabajadores(mTrabajadores);




