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

var ingresos = [];
db = firebase.database();
db.ref('/ingresos').once('value').then(snapshot => {
    ingresos = snapshot.val();
    renderingresos(ingresos);
});

// var db;
// var script = document.createElement('script');
// script.src = "https://www.gstatic.com/firebasejs/5.5.7/firebase.js";
// script.onload = function () {
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyA0nnn3mnnUD8IeLOYV3qwhO2a46jQTHqg",
//         authDomain: "taller-diseno.firebaseapp.com",
//         databaseURL: "https://taller-diseno.firebaseio.com",
//         projectId: "taller-diseno",
//         storageBucket: "taller-diseno.appspot.com",
//         messagingSenderId: "629295465332"
//     };
//     firebase.initializeApp(config);

//     db = firebase.database();
//     db.ref('/ingresos').once('value').then(snapshot => {
//         ingresos = snapshot.val();
//         renderingresos(ingresos);
//     });
// };
// document.head.appendChild(script);

function filterByConcept(ingresos){
    filter = document.getElementById("concept_filter");
    filterKey = filter.value;
    filteredingresos = ingresos.filter(ingreso => ingreso.concepto.toLowerCase().includes(filterKey.toLowerCase()));
    renderingresos(filteredingresos);
}
document.getElementById("concept_filter").addEventListener('change', function(){
    filterByConcept(ingresos)
});
document.getElementById("concept_filter").addEventListener('keyup', function(){
    filterByConcept(ingresos)
});


function saveIngresos(){
    db.ref('/ingresos').set(ingresos)
    .then()
    .catch(error => alert(error));
}

function addIngreso(){
    ingreso = {
        "ingreso": "",
        "concepto": ""
    };
    ingreso.ingreso = document.getElementById("ingreso-input").value
    ingreso.concepto = document.getElementById("concepto-input").value

    document.getElementById("ingreso-input").value = '';
    document.getElementById("concepto-input").value = '';

    ingresos.push(ingreso);
    renderingresos(ingresos);
}

function deleteingreso(index){
    ingresos.splice(index, 1);
    renderingresos(ingresos);
}

function appendingreso(ingreso, index){
    document.getElementById('ingresos').innerHTML += `
                        <tr id="ingreso${index}">
                            <td> ${ingreso.ingreso} </td>
                            <td> ${ingreso.concepto} </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="initEditingreso(${index})" class="btn-white btn btn-xs">Editar</button>
                                    <button onclick="deleteingreso(${index})" class="btn-danger btn btn-xs">Delete</button>
                                </div>
                            </td>
                        </tr>`;
}

function initEditingreso(index){
    document.getElementById(`ingreso${index}`).innerHTML = `
                        <tr id="ingreso${index}">
                        <td><input type="text" id="ingreso-field" value="${ingresos[index].ingreso}" class="form-control"></td>
                        <td><input type="text" id="concepto-field" value="${ingresos[index].concepto}" class="form-control"></td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button onclick="executeEditingreso(${index})" class="btn-primary btn btn-xs">Guardar</button>
                                </div>
                            </td>
                        </tr>`;

}
function executeEditingreso(index){
    ingresos[index] = {
        "ingreso": document.getElementById("ingreso-field").value,
        "concepto": document.getElementById("concepto-field").value
    }
    renderingresos(ingresos);
}

function renderingresos(ingresos){
    document.getElementById('ingresos').innerHTML = '';
    ingresos.forEach((ingreso, i) => appendingreso(ingreso, i));
    saveIngresos();
}

