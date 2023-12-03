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

// Funcion que crea un span generico, 
// recibe el contenido, el nombre de la clase y el id
function createSpan(pValue, pClass, pId) {
    let newSpan = document.createElement("span");
    newSpan.innerText = pValue;
    newSpan.classList.add(pClass);
    newSpan.id = pId;

    return newSpan;
}

/**
 * Genera una lista HTML vacia, indicando el tipo (ol/ul), su clase y su ID.
 * @param {string} pType Tipo de lista
 * @param {string} pClass class
 * @param {string} pId Id
 * @returns lista HTML
 */
function createList(pType, pClass, pId) {
    let newList = document.createElement(pType);
    newList.className = pClass;
    newList.id = pId;

    return newList;
}