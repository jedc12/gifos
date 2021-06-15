//import { getData } from "./connection";

const content = document.querySelector(".section_3_favorite_content");
let localStorageData = 'data';




function getDataFavorite(data){

    let information = [];
    let  dataInLocalStorage = localStorage.getItem(localStorageData);
   
    if(dataInLocalStorage !== null){
        information = JSON.parse(dataInLocalStorage);
    }


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
                                                    <button class="content_card_overlay_button_download" value="${information[i].img}"></button>
                                                    <button class="content_card_overlay_button_screen" value="${information[i].img}"></button>
                                                    <h5 class="content_card_overlay_user" >${information[i].user}</h5>
                                                    <h6 class="content_card_overlay_title">${information[i].titleGiphy}</h6>
                                                </div>
                                                <div class="modal" ></div>
                                            </div>`
            

            let btnDownload = contentFavorite.querySelectorAll('.content_card_overlay_button_download')
            //console.log(btnDownload);
            button_download(btnDownload);
                      
            let btnScreen = contentFavorite.querySelectorAll('.content_card_overlay_button_screen');
            let btnScreenImg = contentFavorite.querySelectorAll('.section_2_slide_carrusel_img');
    
    
            //console.log(btnScreenImg[0].src);
            
            let modal = contentFavorite.querySelector('.modal');
                      
            let userName = contentFavorite.querySelectorAll('.content_card_overlay_user');
            let title = contentFavorite.querySelectorAll('.content_card_overlay_title');
    
            
            button_full_screen(btnScreen, modal, userName, title, btnDownload);
            
            button_full_screen(btnScreenImg, modal, userName, title, btnDownload);
    
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

export { getDataFavorite };


viewDataFavorite();

