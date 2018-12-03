var egresos = [];
var db;
var script = document.createElement('script');
script.src = "https://www.gstatic.com/firebasejs/5.5.7/firebase.js";
script.onload = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA0nnn3mnnUD8IeLOYV3qwhO2a46jQTHqg",
        authDomain: "taller-diseno.firebaseapp.com",
        databaseURL: "https://taller-diseno.firebaseio.com",
        projectId: "taller-diseno",
        storageBucket: "taller-diseno.appspot.com",
        messagingSenderId: "629295465332"
    };
    firebase.initializeApp(config);

    db = firebase.database();
    db.ref('/egresos').once('value').then(snapshot => {
        egresos = snapshot.val();
        renderEgresos(egresos);
    });
};
document.head.appendChild(script);

function filterByConcept(egresos){
    filter = document.getElementById("concept_filter");
    filterKey = filter.value;
    filteredEgresos = egresos.filter(egreso => egreso.concepto.toLowerCase().includes(filterKey.toLowerCase()));
    renderEgresos(filteredEgresos);
}
document.getElementById("concept_filter").addEventListener('change', function(){
    filterByConcept(egresos)
});
document.getElementById("concept_filter").addEventListener('keyup', function(){
    filterByConcept(egresos)
});


function saveEgresos(){
    db.ref('/egresos').set(egresos)
    .then(success => alert("Successfully saved"))
    .catch(error => alert(error));
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
    egresos.splice(index, 1);
    renderEgresos(egresos);
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

