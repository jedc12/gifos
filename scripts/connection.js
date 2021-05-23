

const DOMAIN = 'https://api.giphy.com/v1/gifs/';
const API_KEY = 'tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz';

//Función asincronica que trae los "Trending Gifos".
async function getData(){
    const response = await fetch(`${DOMAIN}trending?api_key=${API_KEY}&limit=100&rating=g`);
    const json = await response.json();
    //console.log(json);
    //viewTrending(json);
    return json
}

async function getDataSeeker(text) {
    const response = await fetch(`${DOMAIN}search/tags?api_key=${API_KEY}&q=${text}&limit=5&offset=0`);
    const json = await response.json();
    return json;
    //SearchData(json);
}

async function getSearchEndpoint(text, limit){
    const response = await fetch(`${DOMAIN}search?api_key=${API_KEY}&q=${text}&limit=${limit}&offset=0&rating=g&lang=en`);
    const json = await response.json();
    return json;
    //viewSearchEndpoint(json);
}

export {getDataSeeker, getSearchEndpoint };
export {getData};