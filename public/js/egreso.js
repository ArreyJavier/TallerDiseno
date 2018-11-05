// TODO: implement connection to firebase
var egresos = [
    {
        "egreso": "egreso1",
        "concepto": "Concepto del egreso 1"
    },
    {
        "egreso": "egreso2",
        "concepto": "Concepto del egreso 2"
    },
    {
        "egreso": "egreso3",
        "concepto": "Concepto del egreso 3"
    },
    {
        "egreso": "egreso4",
        "concepto": "Concepto del egreso 4"
    },
    {
        "egreso": "egreso5",
        "concepto": "Concepto del egreso 5"
    },
    {
        "egreso": "egreso6",
        "concepto": "Concepto del egreso 6"
    },
    {
        "egreso": "egreso7",
        "concepto": "Concepto del egreso 7"
    },
    {
        "egreso": "egreso8",
        "concepto": "Concepto del egreso 8"
    },
    {
        "egreso": "egreso9",
        "concepto": "Concepto del egreso 9"
    },
    {
        "egreso": "egreso10",
        "concepto": "Concepto del egreso 10"
    }
];

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
    renderEgresos();
}

function deleteEgreso(index){
    egresos.splice(index, 1); 
    renderEgresos();
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
    renderEgresos();
}

function renderEgresos(){
    document.getElementById('egresos').innerHTML = '';
    egresos.forEach((egreso, i) => appendEgreso(egreso, i));
}

renderEgresos();
