const content = document.querySelector(".section_4_gifos_elements_content");
const divImg = document.querySelector(".section_4_gifos_elements_content_video");
const callAction = document.querySelector(".section_4_gifos_call_action");
const btnCallActionBottom = document.querySelectorAll(".section_4_gifos_call_action_bottom");
let btnStart = document.querySelector(".section_4_gifos_bottom");
let stopWatch = callAction.querySelector(".section_4_gifos_call_action_bottom_stopwatch");

const title = content.querySelector(".section_title");
const paragraph = content.querySelectorAll(".section_paragraph");


function start(){

    let form = new FormData();
    
    btnStart.addEventListener('click', () =>{

        if(btnStart.value === "COMENZAR"){
            title.innerHTML = "¿Nos das acceso a tu cámara?";
    
            paragraph[0].innerHTML = "El acceso a tu camara será válido sólo";
            paragraph[1].innerHTML = "por tiempo  en el que estés creando el GIFO";
            
            btnCallActionBottom[0].style.background = "#572EE5";
            btnCallActionBottom[0].style.color = "white";
    
            btnStart.style.visibility = "hidden";

             getStreamAndRecord();          

        }else if(btnStart.value == "GRABAR"){

            recorder.startRecording();   
            
            startStopwatch(stopWatch);

            /*stopWatch.innerHTML = "";
            
            stopWatch.style.borderBottom =  "none";
            stopWatch.innerHTML = "00:00:05";*/


            btnStart.value = "FINALIZAR";

        }else if(btnStart.value === "FINALIZAR"){
            
            divImg.innerHTML = "";

            let recording = document.createElement("img");
            recording.classList.add("section_4_gifos_elements_content_video_gif");

            recorder.stopRecording(function(){

                form.append('file', recorder.getBlob(), 'myGif.gif');
            })

            stopStopwacth();            

            let url = URL.createObjectURL(form.get('file'));

            recording.src = url;

            stopWatch.textContent = "REPETIR CAPTURA";
            stopWatch.style.borderBottom =  "2px solid #5ED7C6";
            stopWatch.style.cursor = "pointer";

            btnStart.value = "SUBIR GIFO";
            repeatCapture(stopWatch, form);

            divImg.appendChild(recording);

        }else if (btnStart.value === "SUBIR GIFO"){            

            btnCallActionBottom[1].style.background = "white";
            btnCallActionBottom[1].style.color = "#572EE5";

            btnCallActionBottom[2].style.background = "#572EE5";
            btnCallActionBottom[2].style.color = "white";

            btnStart.style.visibility = "hidden";

            upload(form);


        }       
    });
    
}

function startStopwatch(stopWatch){
    let s = 0;
    let m = 0;
    let h = 0;

    id = setInterval(validate, 1000)

    function validate(){ 
        let sAux;
        let mAux;
        let hAux;

        if(s>59){
            m++;
            s = 0
        }

        if(m>59){
            h++;
            m = 0;
        }

        if(h>24){
            h = 0;
        }

        s < 10 ? sAux='0'+s : sAux = s; 
        m < 10 ? mAux='0'+m : mAux = m;
        h < 10 ? hAux='0'+h : hAux = h;

        stopWatch.innerHTML = "";
            
        stopWatch.style.borderBottom =  "none";
        stopWatch.innerHTML = hAux+':'+mAux+':'+sAux;

        s++;

    }
}

function stopStopwacth(){
    clearInterval(id);
    console.log('se paró el cronometro');
}

async function upload(form){


    let data = {
        method: "POST",
        body: form
    }

    const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=tYonuj9Qetdbi6UFjAibCWg9IRO2Jomz&username=jedc1020`, data)
    const json = await response.json()
    console.log(json);
}

function processChangeDom(){

        title.style.display = "none";
        paragraph[0].style.display = "none";
        paragraph[1].style.display = "none";

        btnCallActionBottom[0].style.background = "white";
        btnCallActionBottom[0].style.color = "#572EE5";

        btnCallActionBottom[1].style.background = "#572EE5";
        btnCallActionBottom[1].style.color = "white";

        stopWatch.innerHTML = "";

        btnStart.style.visibility = "visible";
        btnStart.value = "GRABAR";
}

function getStreamAndRecord(){

    divImg.innerHTML = "";

    let recording = document.createElement("video");
    recording.classList.add("section_4_gifos_elements_content_video_gif");

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1280
        }
    }).then(function(media) {
       
     
        processChangeDom(); 
       
        recording.srcObject = media;
        recording.play();
        

        recorder = RecordRTC(media, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 240,
            onGifRecordingStarted: function(){
                console.log('started');
            }
        });
        
        //console.log(routeSrc);
        /*createGif(routeSrc);*/


    }).catch (err => {
        console.log("No se permiten permisos" +err);
        console.log(err);
    })

    divImg.appendChild(recording);

}




/*function createGif (routeSrc){  

    divImg.innerHTML = "";
    divImg.innerHTML = `<video class="section_4_gifos_elements_content_video_gif" src= "${routeSrc}"></video>`



    /*const img = document.createElement("img");
    img.classList.add("section_4_gifos_elements_content_img_gif");
    img.src = "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ";
    divImg.appendChild(img);


}*/

function repeatCapture(stopWatch, form){
    stopWatch.addEventListener('click', ()=>{
        console.log("Se presionó el botón de repetir captura");
        form.delete('file');
        console.log(form.get('file'));
        getStreamAndRecord();
    })
}


start();