const content = document.querySelector(".section_3_favorite_content");

function getDataFavorite(data){

    let information = data.target.value;
    //localStorage.setItem("datos", data);

    //let getData = localStorage.getItem("datos");

    /*content.innerHTML = `<div class="content_card">
                            <img src="${datos.images.original.url}" class="content_card_item" alt="">
                            <div class="content_card_overlay">
                                <button class="content_card_overlay_button_favorite" value="${datos.images.original.url}"></button>
                                <button class="content_card_overlay_button_download" value="${datos.images.original.url}"></button>
                                <button class="content_card_overlay_button_screen" value="${datos.images.original.url}"></button>
                                <h5 class="content_card_overlay_user" >${datos.username}</h5>
                                <h6 class="content_card_overlay_title">${datos.title}</h6>
                            </div>
                            <div class="modal" ></div>
                        </div>`*/

    console.log(information.images.original.url);
}

export{getDataFavorite};