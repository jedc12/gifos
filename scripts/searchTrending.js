import { getDataSeeker, getSearchEndpoint } from "./connection.js";

const select = document.querySelector(".section_1_search_icon_img_input");
const input = document.querySelector(".section_1_search_input");
const view = document.querySelector(".section_1_search_lists");

//Se ejecuta la entrada de texto
function runInput() {

    textValidate();
    input.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            const keyWords = input.value;
            const limit = 12;

            //Se envía las palabras claves para que retorne giphys seleccionados por el usuario.
            getSearchEndpoint(keyWords, limit).then(jsonEndpoint => {
                viewSearchEndpoint(jsonEndpoint)
            }, prueba => {
                console.log('respuesta rechazada: ' + prueba);
            });

            view.innerHTML = '';
        } else {
            textValidate();
        }
    })
}

//Función que valida si el texto es vacío  o contiene caracteres.
function textValidate() {
    const keyWords = input.value;

    if (keyWords === '' || keyWords === undefined) {

        view.innerHTML = '';
        iconSearch(true);

        select.classList.add("section_1_search_icon_img_input");

    } else {
        iconSearch(false);

        //Es diferente a texto vacío o undefined, entonces se envía y retorna las sugerencias de la barra de busqueda
        getDataSeeker(keyWords).then(json => {
            SearchData(json);
        });


        select.classList.remove("section_1_search_icon_img_input");
    }
}


//Dependiendo si el input está vacío o tiene caracteres, muestra el ícono de la lupa o la equis.
const iconSearch = icon => {

    const iconImg = document.querySelector('.section_1_search_icon_img');

    if (icon) {
        iconImg.src = ('./icons/icon-search.svg');

    } else {
        iconImg.src = ('./icons/Button-close-hover-modo-noc.svg');

        iconImg.addEventListener('click', () => {
            input.value = '';
            textValidate();
        })
    }
}


//Recibe como parámetro el json con las sugerencias según lo digitado en la barra de busqueda.
function SearchData(json) {

    view.innerHTML = '';

    for (let iterar of json.data) {

        view.innerHTML += `<li class = "section_1_search_list"><img src = "./icons/icon-search.svg">  ${iterar.name}</li>`;

        let data = view.querySelectorAll('li');

        for (let i = 0; i < data.length; i++) {
            data[i].addEventListener("click", lists => {
                const list = lists.target;
                selection(list);
            });
        }
    }
}

//Recibe como parámetro la sugerencia seleccionada con el evento click, para que se vuelva a pintar en la barra de busqueda
function selection(element) {
    const selectData = element.textContent;

    input.value = selectData;


    view.innerHTML = '';

}

//Muestra las cards con la busqueda seleccionada
function viewSearchEndpoint(json) {

    const section_1_result = document.querySelector(".section_1_result");
    const content = document.querySelector(".section_1_content_img");
    const section_1_result_title = document.querySelector(".section_1_result_title");
    const btnGetMore = document.querySelector(".section_1_result_button");

    const keyWords = input.value;

    section_1_result.style.display = 'contents';
    section_1_result_title.innerHTML = keyWords;

    content.innerHTML = '';

    const section_1_result_img = document.createElement("div");

    if (json.data.length === 0) {
        section_1_result_img.classList.remove('section_1_result_img');
        section_1_result_img.classList.add('section_1_result_not_found_img');

        section_1_result_img.innerHTML = `<img class="section_1_result_not_found_img_item" src="icons/icon-busqueda-sin-resultado.svg" alt="icon-busqueda-sin-resultado">
                                            <p class="section_paragraph_item">Intenta con otra busqueda</p>`
    } else {
        section_1_result_img.classList.remove('section_1_result_not_found_img');
        section_1_result_img.classList.add('section_1_result_img');

        json.data.forEach((datos) => {

            section_1_result_img.innerHTML += `<div class="content_card">
                                                    <img src="${datos.images.original.url}" class="content_card_item" alt="">
                                                    <div class="content_card_overlay">
                                                        <button class="content_card_overlay_button_favorite"></button>
                                                        <button class="content_card_overlay_button_download" value="${datos.images.original.url}"></button>
                                                        <button class="content_card_overlay_button_screen" value="${datos.images.original.url}"></button>
                                                        <h5 class="content_card_overlay_user" >${datos.username}</h5>
                                                        <h6 class="content_card_overlay_title">${datos.title}</h6>
                                                    </div>
                                                    <div class="modal" ></div>
                                                </div>`

            let btnDownload = section_1_result_img.querySelectorAll('.content_card_overlay_button_download');

            button_download(btnDownload);

            let btnScreen = section_1_result_img.querySelectorAll('.content_card_overlay_button_screen');
            let btnScreenImg = section_1_result_img.querySelectorAll('.content_card_item');
            
            let modal = section_1_result_img.querySelector('.modal');

            let userName = section_1_result_img.querySelectorAll('.content_card_overlay_user');
            let title = section_1_result_img.querySelectorAll('.content_card_overlay_title');

            button_full_screen(btnScreen, modal, userName, title, btnDownload);
            button_full_screen(btnScreenImg, modal, userName, title, btnDownload);
        });
    }

    viewButton(json, btnGetMore);

    content.appendChild(section_1_result_img);
}

//Función para descargar giphy
function button_download(btnDowload) {

    for (let i = 0; i < btnDowload.length; i++) {
        btnDowload[i].addEventListener("click", lists => {

            let imgpath = lists.target.value;
            let fileName = getFileName(imgpath);

            saveAs(imgpath, fileName);
        });
    }

}

function getFileName(link) {

    return link.substring(link.lastIndexOf('/') + 1);
}

//funcion que recibe parametros para poner pantalla completa
function button_full_screen(btnScreen, modal, userName, title, btnDownload) {

    for (let i = 0; i < btnScreen.length; i++) {

        btnScreen[i].addEventListener("click", url => {

            let imgFull;
            
            if(url.target.value){
                imgFull = url.target.value;
            }

            if(url.target.src){
                imgFull = url.target.src;
            }
            let user = userName[i].textContent;
            let titleGiphy = title[i].textContent;
            let imgpath = btnDownload[i].value;
            console.log(imgpath);
            modal.style.display = "block";
            fullScreen(modal, imgFull, user, titleGiphy, imgpath);

        });
    }
}



//funcion que recibe parametros de la funtion button_full_screen para que muestre el giphy seleccionado en pantalla completa.
//Además recibe otros parámetros como imgPath para descargar el giphy mostrado.
function fullScreen(modal, imgFull, userName, title, imgPath) {

    modal.innerHTML = `<div class="modal_content">
                            <span class="modal_close">&times;</span>
                            <img class="modal_img" src="${imgFull}">
                            <div class="modal_self">
                                <div class="modal_self_information">
                                    <h6 class="modal_self_information_name">${userName}</h6>
                                    <h5 class="modal_self_information_title">${title}</h5>
                                </div>  
                                <div class="modal_self_button">
                                    <button class="modal_self_button_favorite"></button>
                                    <button class="modal_self_button_download" value="${imgPath}"></button>
                                </div>
                            </div>                            
                       </div>`
    let btnDownload = document.querySelectorAll('.modal_self_button_download');

    button_download(btnDownload);

    const span = modal.querySelectorAll('.modal_close')[0];

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

//Función para mostrar el botón "ver más".
let quantity = 0;
let viewButton = (jsonEndpoint, btnGetMore) => {

    console.log('Cantidad de posiciones: ' + jsonEndpoint.data.length);

    if (quantity === jsonEndpoint.data.length && quantity !== jsonEndpoint.data.length) {
        btnGetMore.style.visibility = 'hidden';
        console.log('Estoy en el si');
    } else if(jsonEndpoint.data.length === 12){
        console.log('Estoy en el sino');

        btnGetMore.style.visibility = 'visible';

    }else{
        btnGetMore.style.visibility = 'visible';
    }
    quantity = jsonEndpoint.data.length;
}

function main() {
    runInput();
    const btnGetMore = document.querySelector(".section_1_result_button");
    let keyWords;
    
    let limit = 12;
    //let quantity = 0;
    console.log('Estoy en el main')

    btnGetMore.addEventListener('click', () => {
        keyWords = input.value;
        limit = limit + 12;
        getSearchEndpoint(keyWords, limit).then(jsonEndpoint => {
            viewSearchEndpoint(jsonEndpoint);
        });
    });
}

main();