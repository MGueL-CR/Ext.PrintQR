//  Valida la existencia del nodo con la clase .title y proceder 
//  con la creación e inserción del código QR en el navegador.
try {
    if (validarNodo(document.getElementsByClassName('title')[0])) {
        let nameVPOLot= getVPOName();
        insertInputs();
        formatTable();
        convertToQR(nameVPOLot);
    }
} catch (e) {
    alert(e);
}

//  Lee el texto de la clase title y lo separa para retornar 
//  el valor que esta en la posicion 1 (0, 1, 2, ...).
function getVPOName() {
    try {        
        let title= document.getElementsByClassName('title')[0].innerText;    
        return title.split(":")[1].trim() + '\n';
    } catch (e) {
        console.log(e);
        throw new Error('\nNo es posible obtener el nombre de la VPO.');
    }
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
}

//  Llama a la libreria QRCode para crear el QR con el valor de la VPO/QZ.
function convertToQR(pText) {   
    try {
        const ChartQR = document.getElementById('ChartQRCode');
    
        new QRCode(ChartQR, {
            text: pText,
            width: 64,
            height: 64,
            colorDark: "#006666",
            colorLight: "#f5f5f5"
        });
    } catch (e) {
        console.log(e);
        throw new Error( e.name + '\nNo es posible generar el código QR.')
    }
}

//  Funcion principal para insertar los elementos que se mostraran
function insertInputs() {

    let QRDiv= createDivs('QRCode', 'ChartQRCode');

    let div1= createDivs('field', 'div1');
    div1.appendChild(creatLabel('iTool', 'Tool:'));
    div1.appendChild(createInputs('text', 'inputs', 'iTool'));

    let div2= createDivs('field', 'div2');
    div2.appendChild(creatLabel('iQty', 'Qty:'));
    div2.appendChild(createInputs('text', 'inputs', 'iQty'));


    let fields= createDivs('fields', 'fields');
    fields.appendChild(div1);
    fields.appendChild(div2);

    let banner= createDivs('banner', 'banner');
    banner.appendChild(QRDiv);
    banner.appendChild(fields);
    
    document.getElementsByTagName('body')[0].appendChild(banner); 
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
    newInput.id= pId;

    return newInput;
}