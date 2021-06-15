const navBar = document.querySelectorAll('.navigation_item');
const section_1 = document.querySelector('.section_1');
const section_3_favorite = document.querySelector('.section_3_favorite');



navBar.forEach((value) => {
    value.addEventListener("click", () =>{
        if(value.textContent == 'FAVORITOS'){
            section_1.style.display = "none";
            section_3_favorite.style.display = "block";
        }
        console.log(value.textContent);
    })
});

