//import {getData} from "./trending.js";

/*const dominio = 'https://api.giphy.com/v1/gifs/';
const ruta = 'search/tags';
const apiKey = 'tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz';
const search = 'q';
const limit = '4';*/

//search?api_key=tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz&q=vegeta&limit=25&offset=0&rating=g&lang=en

//search?api_key=tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz&${search}={text}&limit=12&offset=0&rating=g&lang=en

/*async function getDataSeeker(text) {
    const response = await fetch(`${dominio}${ruta}?api_key=${apiKey}&${search}=${text}&limit=${limit}&offset=0`);
    const json = await response.json();
    SearchData(json);
    
}

async function getSearchEndpoint(text){
    const response = await fetch(`${dominio}search?api_key=tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz&${search}=${text}&limit=12&offset=0&rating=g&lang=en`);
    const json = await response.json();
    
    viewSearchEndpoint(json);
}*/

const dominio = 'https://api.giphy.com/v1/gifs/';
const ruta = 'search/tags';
const apiKey = 'tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz';
const search = 'q';
const limit = '4';


async function getData(text) {
    const response = await fetch(`${dominio}${ruta}?api_key=${apiKey}&${search}=${text}&limit=${limit}&offset=0`);
    const json = await response.json();
    SearchData(json);
}



const input = document.querySelector(".section_1_search_input");
const select = document.querySelector(".section_1_search_icon_img");
const view = document.querySelector(".section_1_search_lists");

function runInput() {
    const text = input.value;

    if (text === '' || text === undefined) {
        view.innerHTML = '';
        iconSearch(true);
    } else {
       // input.image = ('./icons/icon-search.svg');
        getData(text);
        iconSearch(false);
        
    }
    input.addEventListener('keyup', runInput);
}


function SearchData(json) {


    view.innerHTML = '';
    //const icon = src('./icons/icon-search-modo-noct.svg');

    for (let iterar of json.data) {

        view.innerHTML += `<option value="${iterar.name}" class = "section_1_search_list">${iterar.name}</option>`;
        //<img src = "./icons/icon-search.svg">

        let data = view.querySelectorAll('li');

        for (let i = 0; i < data.length; i++) {
            data[i].setAttribute("onclick", 'selection(this)');
        }

    }
}

function selection(element) {
    let selectData = element.textContent;

    input.value = selectData;


    view.innerHTML = '';
}

const iconSearch = icon => {    

    const iconImg = document.querySelector('.section_1_search_icon_img');
    //let buttonImg;

    if(icon){
        iconImg.src = ('./icons/icon-search.svg');
        
    }else{
        iconImg.src = ('./icons/Button-close-hover-modo-noc.svg');
        
        iconImg.addEventListener('click', () =>{
            input.value = '';
            runInput();
        })
        
    }

    
}

//select.addEventListener('click', runInput);

runInput();