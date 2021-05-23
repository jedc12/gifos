const dominio = "https://api.giphy.com/v1/gifs/";
const apiKey = "tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz";
const rating = "rating=g";
const language = "lang=en";

https://api.giphy.com/v1/gifs/Yonuj9Qetdbi6UFjAibCWg9IRO2Jomz

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