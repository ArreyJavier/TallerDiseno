var egresos = [];
var script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/5.5.7/firebase.js";
script.onload = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDRdTwk5zDbMWIk3W3SqbkG87FK1pnnabo",
        authDomain: "taller-de-diseno.firebaseapp.com",
        databaseURL: "https://taller-de-diseno.firebaseio.com",
        projectId: "taller-de-diseno",
        storageBucket: "taller-de-diseno.appspot.com",
        messagingSenderId: "414101844708"
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    db.ref('/egresos').once('value').then(snapshot => {
        egresos = snapshot.val();
        renderEgresos(egresos);
    });
};
document.head.appendChild(script);

function saveEgresos(){
    db.ref('/egresos').set(egresos);
}

function addEgreso(){
    egreso = {
        "egreso": "",
        "concepto": ""
    };
    egreso.egreso = document.getElementById("egreso-input").value
    egreso.concepto = document.getElementById("concepto-input").value

    document.getElementById("egreso-input").value = '';
    document.getElementById("concepto-input").value = '';

    egresos.push(egreso);
    renderEgresos(egresos);
}

function deleteEgreso(index){
<<<<<<< HEAD:public/javascripts/egreso.js
    egresos.splice(index, 1); 
    renderEgresos(egresos);
=======
    egresos.splice(index, 1);
    renderEgresos();
>>>>>>> f383d9e233a54da1153f3da7dc66e6f597120419:public/javascripts/egreso.js
}

function appendEgreso(egreso, index){
    document.getElementById('egresos').innerHTML += `
                        <tr id="egreso${index}">
                            <td> ${egreso.egreso} </td>
                            <td> ${egreso.concepto} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="initEditEgreso(${index})" class="btn-white btn btn-xs">Editar</button>
                                    <button onclick="deleteEgreso(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function initEditEgreso(index){
    document.getElementById(`egreso${index}`).innerHTML = `
                        <tr id="egreso${index}">
                        <td><input type="text" id="egreso-field" value="${egresos[index].egreso}" class="form-control"></td>
                        <td><input type="text" id="concepto-field" value="${egresos[index].concepto}" class="form-control"></td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="executeEditEgreso(${index})" class="btn-primary btn btn-xs">Guardar</button>
                                </div>
                            </td>
                        </tr>`;

}
function executeEditEgreso(index){
    egresos[index] = {
        "egreso": document.getElementById("egreso-field").value,
        "concepto": document.getElementById("concepto-field").value
    }
    renderEgresos(egresos);
}

function renderEgresos(egresos){
    document.getElementById('egresos').innerHTML = '';
    egresos.forEach((egreso, i) => appendEgreso(egreso, i));
}

