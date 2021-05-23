import {getData} from "./connection.js";

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

/*function getVectorImages(json){
    //Añadir contenido
    //const content = document.querySelector(".section_2_slide_carrusel");
    //let arrayGiphy = [];
    json.data.forEach((json) => {
        //content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${datos.images.original.url}">`;
        //let giphy = content.querySelectorAll('.section_2_slide_carrusel_img');
        
        
    //arrayGiphy.push(datos.images.original.url);
        content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${arrayGiphy[iterar]}">`;
    });

   Trending(arrayGiphy);
}*/

function Trending(json){

    const content = document.querySelector(".section_2_slide_carrusel");
    const btnRight = document.querySelector(".section_2_slide_button_right");
    const btnLeft = document.querySelector(".section_2_slide_button_left");

    json.data.forEach((datos) => {
        content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${datos.images.original.url}">`;
    });

    //let numInicio = 0;
    //let numFinal = 3


    /*json.data.forEach((datos) => {
        //content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${datos.images.original.url}">`;
        //let giphy = content.querySelectorAll('.section_2_slide_carrusel_img');
        
        
    arrayGiphy.push(datos.images.original.url);
       
    });*/

    //viewTrending(content, numInicio, numFinal, arrayGiphy,);

    btnRight.addEventListener('mousedown', () =>{

        btnRight.style.backgroundImage = "url('/icons/Button-Slider-right-hover.svg')";
        btnRight.style.overflowX = "auto";

        //numInicio = numInicio + 3;
        //numFinal = numFinal + 3;

        //viewTrending(content, numInicio, numFinal, arrayGiphy);
        
    });

    btnRight.addEventListener('mouseup', () =>{
        btnRight.style.backgroundImage = "url('/icons/Button-Slider-right.svg')";
    });

    btnLeft.addEventListener('mousedown', () =>{

        btnLeft.style.backgroundImage = "url('/icons/button-slider-left-hover.svg')";

        //numInicio = numInicio - 3;
        //numFinal = numFinal - 3;

        //viewTrending(content, numInicio, numFinal, arrayGiphy);
        
    });
    
    btnLeft.addEventListener('mouseup', () =>{
        btnLeft.style.backgroundImage = "url('/icons/button-slider-left.svg')";
    });


    /*for (let iterar = numInicio; iterar < numFinal; iterar++){
        content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${arrayGiphy[iterar]}">`;
    }*/

}


/*function viewTrending(content, numInicio, numFinal, arrayGiphy){

    
        console.log(numInicio);
        console.log(numFinal);
        content.innerHTML = '';
    for (let iterar = numInicio; iterar < numFinal; iterar++){
        content.innerHTML += `<img class="section_2_slide_carrusel_img" src="${arrayGiphy[iterar]}">`;
    }
}*/

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