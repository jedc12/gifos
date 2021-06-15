//import { getData } from "./connection";

const content = document.querySelector(".section_3_favorite_content");
let localStorageData = 'data';




function getDataFavorite(data){

    let information = [];
    let  dataInLocalStorage = localStorage.getItem(localStorageData);
   
    if(dataInLocalStorage !== null){
        information = JSON.parse(dataInLocalStorage);
    }else


    //console.log(information);    

    information.push(data);


    localStorage.setItem(localStorageData, JSON.stringify(information));
    console.log(information);

    viewDataFavorite();    
};



function viewDataFavorite(){

    
    //let dataInLocalStorage = localStorage.getItem(localStorageData);


    content.style.display = 'contents'
    const contentFavorite = document.createElement('div');

    content.innerHTML= '';

    if(localStorage.getItem(localStorageData)){
        contentFavorite.classList.remove('section_3_favorite_content_message');        
        contentFavorite.classList.add('section_3_favorite_content_img');

        let information = JSON.parse(localStorage.getItem(localStorageData))
        //let data =  JSON.parse(localStorage.getItem(localStorageData));
      
        console.log(information);  
        

        for(let i = 0; i < information.length; i++){
            contentFavorite.innerHTML += `<div class="content_card">
                                                <img src="${information[i].img}" class="content_card_item" alt="">
                                                <div class="content_card_overlay">
                                                    <button class="content_card_overlay_button_favorite" value=""></button>
                                                    <button class="content_card_overlay_button_download" value=""></button>
                                                    <button class="content_card_overlay_button_screen" value=""></button>
                                                    <h5 class="content_card_overlay_user" >${information[i].user}</h5>
                                                    <h6 class="content_card_overlay_title">${information[i].titleGiphy}</h6>
                                                </div>
                                                <div class="modal" ></div>
                                            </div>`
            console.log(information[i]);
        }

        console.log('Estoy en el verdadero');
    }else{

        contentFavorite.classList.remove('section_3_favorite_content_img');
        contentFavorite.classList.add('section_3_favorite_content_message');

        contentFavorite.innerHTML = `<img class="section_3_favorite_content_message_img" src="icons/icon-fav-sin-contenido.svg" alt="icon-fav-sin-contenido.svg">
                                     <p class="section_paragraph_item">"¡Guarda tu primer Gifo en Favoritos
                                     para que se muestre aquí"</p>`

        console.log('Estoy en el falso');
    }

    content.appendChild(contentFavorite);
   // localStorage.removeItem('data');
}

export { getDataFavorite };


viewDataFavorite();

