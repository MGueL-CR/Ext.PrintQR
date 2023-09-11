
//  Valida si existe el nodo con el valor de la VOP,
//  si existe procede a llamar las otras funciones.
function validarNodo(pNode) {
    return pNode === document.body ? false : document.body.contains(pNode);
}

//  Inserta el caption a la tabla principal donde irá el Código QR.
function insertCaption() {

    let table= document.getElementsByTagName('table')[0];
    table.classList.add('principal');

    let divQRCode = document.createElement('caption');
    divQRCode.textContent= "";
    divQRCode.className= 'QRCode';
    divQRCode.id= 'ChartQRCode';
    table.appendChild(divQRCode);
}

//  Llama a la libreria QRCode para crear el QR con el valor de la VPO/QZ.
function convertToQR(pText) {   
    const ChartQR = document.getElementById('ChartQRCode');
    
    new QRCode(ChartQR, {
        text: pText,
        width: 64,
        height: 64,
        colorDark: "#000",
        colorLight: "#f5f5f5"
    });
}

//  Valida la existencia del nodo con la clase .title y proceder 
//  con la creación e inserción del código QR en el navegador.
if (validarNodo(document.getElementsByClassName('title')[0])) {

    let title= document.getElementsByClassName('title')[0].innerText;

    let nameVPO= title.split(":")[1].trim();
    insertInputs();
    insertCaption();
    convertToQR(nameVPO);
}

//  Funcion principal para insertar los inputs
function insertInputs() {

    let thisBody= document.getElementsByTagName('body')[0]; 

    let div1= createDivs('field', 'div1');
    div1.appendChild(creatLabel('iTool', 'Tool:'));
    div1.appendChild(createInputs('text', 'inputs', 'iTool'));

    let div2= createDivs('field', 'div2');
    div2.appendChild(creatLabel('iQty', 'Qty:'));
    div2.appendChild(createInputs('text', 'inputs', 'iQty'));

    let fields= createDivs('fields', 'fields');
    fields.appendChild(div1);
    fields.appendChild(div2);

    thisBody.appendChild(fields);
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

// Funcion que crea un label generico, 
// recibe el tipo de input, el nombre de la clase y id que indique
function createInputs(pType, pClass, pId) {
    let newInput= document.createElement('input');
    newInput.type= pType;
    newInput.className= pClass;
    newInput.id= pId;

    return newInput;
}