//  Variable que funcionara como indicador de estado de cambio entre el tipo de código.
let modeActive = true;

try {

//  Valida la existencia del nodo con la clase .title y proceder 
//  con la creación e inserción del código QR en el navegador.
    if (validarNodo(document.getElementsByClassName('title')[0])) {
        insertInputs();
        setTypeCode();
        formatTable();
    }

} catch (e) {
    console.error(e);
    alert('Error no controlado, favor de validar en consola.\n\nDetalles:\n' + e);
}

/**
 * 
 *  Area para funciones
 * 
 */

//  Lee el texto de la clase title y lo separa para retornar 
//  el valor que esta en la posicion 1 (0, 1, 2, ...).
function getVPOName() {
    try {        
        let title= document.getElementsByClassName('title')[0].innerText;    
        return title.split(":")[1].trim();
    } catch (e) {
        console.log(e);
        throw new Error('\nNo es posible obtener el nombre de la VPO.');
    }
}

// Funcion que invierte el estado de la variable cada vez que hace clic en el boton
// Seguido llama al metodo para cambiar el tipo de código
function changeTypeCode() {
    modeActive = !modeActive;

    let qrcode = document.getElementById("scanner");
    qrcode.getElementsByTagName('img')[0].remove();
    
    if (validarNodo(qrcode.getElementsByTagName('canvas')[0])) {
        qrcode.getElementsByTagName('canvas')[0].remove();
    }

    document.getElementById("btnChangeCode").value = modeActive? 'Tipo QR' : 'Tipo Barra';

    setTypeCode();
}

//  Valida si existe el nodo con el valor de la VOP,
//  si existe procede a llamar las otras funciones.
function validarNodo(pNode) {
    return pNode === document.body ? false : document.body.contains(pNode);
}

//  Da formato a la tabla principal para dar espacio al QR y sus inputs.
function formatTable() {

    document.getElementsByTagName('table')[0].classList.add('principal');

    document.getElementsByClassName('title')[0].classList.add('VPOName');

    truncTable(document.querySelector("table").childNodes[0]);
}

// Obtiene la tabla y la acorta a solo las 6 primeras filas del total real,
// por ultimo, agrega una fila extra en caso que la tabla supere las 5 primeras filas.
function truncTable(pTable) {

    let indx = [0, 1, 2, 3, 4, 5];
    let newRows = [];
    const allChildrens = pTable.children.length;

    for (const iIndex of indx) {
        newRows.push(pTable.children[iIndex]);
    }

    document.querySelector('table').innerHTML = "";

    for (const iRow of newRows) {
        document.querySelector('table').appendChild(iRow);
    }

    if (allChildrens > 6) {
        let info= document.createElement('tr');
        info.innerHTML= '<td class="truncated"><p> ** This table was truncated **</p></td>';
        document.querySelector('table').appendChild(info);
    }
}

//  Intercambia el tipo de codigo que se muestra en la pagina.
function setTypeCode() {

    if (modeActive) {
        generateBarCode(getVPOName());
    } else {
        generateQRCode(getVPOName());
    }
}

//  Llama a la libreria JsBarCode para crear el codigo de barra con el valor de la VPO/QZ.
function generateBarCode(pValor) {
    try {
        const newBarCode = document.createElement("img");
        newBarCode.id = "barcode";
        document.getElementById("scanner").appendChild(newBarCode);

        JsBarcode("#barcode", pValor, {
            format: "CODE39",
            lineColor: "#006666",
            background: "#fff",
            width: 1,
            height: 55,
            margin: 3,
            mod43: false,
            displayValue: false,
        });
    } catch (e) {
        console.log(e);
        throw new Error(
            e.name + "\nNo es posible generar el código de barras."
        );
    }
}

//  Llama a la libreria QRCode para crear el QR con el valor de la VPO/QZ.
function generateQRCode(pText) {   
    try {
        const ChartQR = document.getElementById('scanner');
    
        new QRCode(ChartQR, {
            text: pText,
            width: 64,
            height: 64,
            colorDark: "#006666",
            colorLight: "#fff"
        });
    } catch (e) {
        console.log(e);
        throw new Error( e.name + '\nNo es posible generar el código QR.')
    }
}

/**
 * 
 *  Area de crear elementos HTML
 * 
 */

//  Funcion principal para insertar los elementos que se mostraran
function insertInputs() {

    let header= document.createElement('header');
    let QRDiv= createDivs('scanner', 'scanner');

    let div1= createDivs('field', 'div1');
    div1.appendChild(creatLabel('iTool', 'Tool:'));
    div1.appendChild(createInputs('text', 'inputs', 'iTool'));

    let div2= createDivs('field', 'div2');
    div2.appendChild(creatLabel('iQty', 'Qty:'));
    div2.appendChild(createInputs('number', 'inputs', 'iQty'));

    let div3= createDivs('field', 'div3');
    div3.appendChild(createButton('btnChangeCode', 'buttons', 'Tipo QR', 'click', changeTypeCode));

    let fields= createDivs('fields', 'fields');
    fields.appendChild(div1);
    fields.appendChild(div2);

    let banner= createDivs('banner', 'banner');
    banner.appendChild(QRDiv);
    banner.appendChild(fields);
    banner.appendChild(div3);
    
    header.appendChild(banner);
    document.getElementsByTagName("body")[0].appendChild(header);
}

// Funcion que crea un div generico, 
// recibe el nombre de la clase y id que indique
function createDivs(pClass, pId) {
    let newDiv= document.createElement('div');
    newDiv.className= pClass;
    newDiv.id= pId;

    return newDiv;
}

// Funcion que crea un label generico, 
// recibe el valor del texto a mostar y la referncia al input propio
function creatLabel(pForInput, pValue) {
    let labels= document.createElement('label');
    labels.className= 'labels';
    labels.htmlFor= pForInput;
    labels.textContent= pValue;

    return labels;
}

// Funcion que crea un input generico, 
// recibe el tipo de input, el nombre de la clase y id que indique
function createInputs(pType, pClass, pId) {
    let newInput= document.createElement('input');
    newInput.type= pType;
    newInput.className= pClass;
    newInput.name= pId;
    newInput.id= pId;

    return newInput;
}

// Funcion que crea un input tipo botón, recibe el valor, 
// el nombre de la clase y id, además del evento asociado
function createButton(pId, pClass, pValue, pEvent, pFuntion) {
    let newButton = createInputs("button", pClass, pId);
    newButton.addEventListener(pEvent, pFuntion, true);
    newButton.value = pValue;

    return newButton;
}