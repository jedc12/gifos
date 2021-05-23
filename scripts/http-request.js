//search:
//&q=&limit=25&offset=0&


//Trending
//&limit=25&

//autocomplete
//&limit=25&offset=4&

//search suggestions
//


const dominio = "https://api.giphy.com/v1/gifs/";
const apiKey = "tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz";
const rating = "rating=g";
const language = "lang=en";


/**
 * 
 * @param {*} ruta 
 * @param {*} value 
 * @param {*} limit 
 * @param {*} off 
 */

const peticion =async(ruta, value, limit, off)=>{
    const request = await fetch(`${dominio}${ruta}?api_key=${apiKey}&q=${value}&limit=${limit}&offset=${off}&${rating}&${language}`);

    const data = await request.json();

    console.log(data);
}









export{
    peticion
}