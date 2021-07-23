import {getData} from "./connection.js";
import {getDataFavorite} from "./favorite.js";

/*const dominio = 'https://api.giphy.com/v1/gifs/';
const ruta = 'trending';
const apiKey = 'tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz';
const limit = '25';
const rating = 'g'

async function getData(){
    const response = await fetch(`${dominio}${ruta}?api_key=${apiKey}&limit=${25}&rating=${rating}`);
    const json = await response.json();
    //console.log(json);
    viewTrending(json);
}*/

function getTrendings(){

        getData().then(json =>{
            //json.data.forEach((datos) => {
                Trending(json);        
                            
            //});
        })
        
}

//function getVectorImages(json){
    //Añadir contenido
    //const content = document.querySelector(".section_2_slide_carrusel");
    //let arrayGiphy = [];
    //json.data.forEach((datos) => {
        //content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${datos.images.original.url}">`;
        //let giphy = content.querySelectorAll('.section_2_slide_carrusel_img');
        
        
    //arrayGiphy.push(datos.images.original.url);
       
   // });

   //Trending(json.data);
//}

function Trending(json){

    const content = document.querySelector(".section_2_slide_carrusel");
    const btnLeft = document.querySelector(".section_2_slide_button_left");
    const btnRight = document.querySelector(".section_2_slide_button_right");
    

    let numInicio = 0;
    let numFinal = 3

    viewTrending(content, numInicio, numFinal, json.data);

    btnRight.addEventListener('mousedown', () =>{

        btnRight.style.backgroundImage = "url('/icons/Button-Slider-right-hover.svg')";

        numInicio += 1;
        numFinal += 1;

        viewTrending(content, numInicio, numFinal, json.data);
        
    });

    btnRight.addEventListener('mouseup', () =>{
        btnRight.style.backgroundImage = "url('/icons/Button-Slider-right.svg')";
    });

    btnLeft.addEventListener('mousedown', () =>{

        btnLeft.style.backgroundImage = "url('/icons/button-slider-left-hover.svg')";

        numInicio -= 1;
        numFinal -= 1;

        viewTrending(content, numInicio, numFinal, json.data);
        
    });
    
    btnLeft.addEventListener('mouseup', () =>{
        btnLeft.style.backgroundImage = "url('/icons/button-slider-left.svg')";
    });


    /*for (let iterar = numInicio; iterar < numFinal; iterar++){
        content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${arrayGiphy[iterar]}">`;
    }*/

}


function viewTrending(content, numInicio, numFinal, json){

    
        console.log(numInicio);
        console.log(numFinal);
        content.innerHTML = '';
    for (let iterar = numInicio; iterar < numFinal; iterar++){
        content.innerHTML += `<div class="content_card">
                               <img class="section_2_slide_carrusel_img" src="${json[iterar].images.original.url}">
                               <div class="content_card_overlay">
                                    <button class="content_card_overlay_button_favorite" value="${json[iterar].images.original.url}"></button>
                                    <button class="content_card_overlay_button_download" value="${json[iterar].images.original.url}"></button>
                                    <button class="content_card_overlay_button_screen" value="${json[iterar].images.original.url}"></button>
                                    <h5 class="content_card_overlay_user" >${json[iterar].username}</h5>
                                    <h6 class="content_card_overlay_title">${json[iterar].title}</h6>
                               </div>
                               <div class="modal" ></div>
                              </div>`

        let btnDownload = content.querySelectorAll('.content_card_overlay_button_download');

        //console.log(btnDownload);
        button_download(btnDownload);
                  
        let btnScreen = content.querySelectorAll('.content_card_overlay_button_screen');
        let btnScreenImg = content.querySelectorAll('.section_2_slide_carrusel_img');


        //console.log(btnScreenImg[0].src);
        
        let modal = content.querySelector('.modal');
                  
        let userName = content.querySelectorAll('.content_card_overlay_user');
        let title = content.querySelectorAll('.content_card_overlay_title');

       
        button_full_screen(btnScreen, modal, userName, title, btnDownload);
        
        button_full_screen(btnScreenImg, modal, userName, title, btnDownload);

        let btnFavorite = content.querySelectorAll('.content_card_overlay_button_favorite');
            
        button_favorite(btnFavorite, userName, title);
                  
       
    }

    
}

//funcion para agregar favoritos

function button_favorite(btnFavorite, userName, title){
    for(let i = 0; i < btnFavorite.length; i++){
        btnFavorite[i].addEventListener("click", lists=>{
            console.log('función favorite ');
            //console.log(lists.target.value);
            

            //let img = lists.target.value;
            //let user = userName[i].textContent;
            //let titleGiphy = title[i].textContent;

           let data = {
            img : lists.target.value,
            user : userName[i].textContent,
            titleGiphy : title[i].textContent
           }

           
           getDataFavorite(data);
            
            //let b = document.querySelector('.section_3_favorite_content_message');

            //b.innerHTML = a;
        })
    }
}

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
            modal.style.display = "block";
            fullScreen(modal, imgFull, user, titleGiphy, imgpath);

        });
    }
}

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

/*function section_2_slide(datos){

    //Añadir contenido
    const content = document.querySelector(".section_2_slide_carrusel");

    //Añadir etiquetas

    //const section_2_slide_item_div = document.createElement("div");
    const section_2_slide_carrusel_img = document.createElement("img");

    //Añadir clases

    //section_2_slide_item_div.classList.add("section_2_slide_item");
    section_2_slide_carrusel_img.classList.add("section_2_slide_carrusel_img");

    //agregar imagenes a cada clase section_2_slide_item_img
    section_2_slide_carrusel_img.src = datos.images.original.url;

    const variable = section_2_slide_carrusel_img;
    console.log(variable);
    
    //section_2_slide_item_div.appendChild(section_2_slide_item_img);
    //content.appendChild(section_2_slide_item_div);
    content.appendChild(section_2_slide_carrusel_img);

}*/

getTrendings();