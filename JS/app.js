
//  Valida si existe el nodo con el valor de la VOP,
//  si existe procede a llamar las otras funciones.
function validarNodo(node) {
    return node === document.body ? false : document.body.contains(node);
}

//  Inserta el caption a la tabla principal donde irá el Código QR.
function insertCaption() {

    let table= document.getElementsByTagName('table')[0];

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
        width: 48,
        height: 48,
        colorDark: "#000",
        colorLight: "#f5f5f5"
    });
}

//  Valida la existencia del nodo con la clase .title y proceder 
//  con la creación e inserción del código QR en el navegador.
if (validarNodo(document.getElementsByClassName('title')[0])) {

    let title= document.getElementsByClassName('title')[0].innerText;

    let nameVPO= title.split(":")[1].trim();
    insertCaption();
    convertToQR(nameVPO);
}

