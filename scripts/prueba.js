function iniciar () {

    let s = 0;
    let m = 0;
    let h = 0;

    id = setInterval(escribir, 1000)

    function escribir(){ 
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


        console.log(hAux+':'+mAux+':'+sAux);
        s++
    }

}

function parar(){
    clearInterval(id);
    console.log('se paró el cronometro');
}

iniciar()



