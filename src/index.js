import { WavDecoder } from './util/WavDecoder.js';
import { WaveRender } from './util/WaveRender.js';

const waveRender = new WaveRender(document.querySelector('#container'))
let decorder;
let reader;

window.onSelect = function onSelect(event){

    if(!event.target.files[0]) return;
    if(reader){
        reader.abort()
    }
    reader = new FileReader();
   
    let loadOffset = 0;
    if(decorder){
        decorder.abort();
    }
    decorder = new WavDecoder();
    decorder.onprocess = data => { 
        waveRender.render(data.data, data.rangeStart/data.total,  data.rangeEnd/data.total );
       
    };
    decorder.onwaitting = () => {
        decorder.appendBuffer(reader.result.slice(loadOffset));
        loadOffset = reader.result.byteLength;
    }
    decorder.oncomplete = () => {
        console.log('complete....')
    }

    reader.onload = () => {
        if(0 === loadOffset&&reader.result){
            decorder.decode(reader.result);
            loadOffset = reader.result.byteLength;
        }
    }
    reader.readAsArrayBuffer(event.target.files[0]);
    waveRender.clear();
}


// const waveRender = new WaveRender(document.querySelector('#container'))
let fetchReader;
function onLoadAudio(url){
    if(decorder){

        decorder.abort();
        waveRender.clear()
    }
    decorder = new WavDecoder();
    decorder.onprocess = data => { 
        waveRender.render(data.data, data.rangeStart/data.total,  data.rangeEnd/data.total );
       
    };
    decorder.oncomplete = () => console.log('cmp')
    try{
        loadAudio(url, decorder);
    }catch(e){
        console.error('e: ', e);
    }
    
}

window.loadAudio = function loadAudio(url, decorder){
    const controller = new AbortController()
    const signal = controller.signal;
    
    fetch(url,{ signal, method: 'GET'}).then( rsp => {

        fetchReader = rsp.body.getReader();

        decorder.onwaitting = () => fetchReader.read().then(data => {
            if(!data.done){
                const buffer = new ArrayBuffer(data.value.length);
                const view = new Uint8Array(buffer);
                view.set(data.value);
                decorder.appendBuffer(buffer);
                
            }

        });
        decorder.onabort = () => { 
            controller.abort(); 
            fetchReader.cancel() 
        };

        fetchReader.read().then( data => {
            const buffer = new ArrayBuffer(data.value.length);
            const view = new Uint8Array(buffer);
            view.set(data.value);
            decorder.decode(buffer);
        });

            

    }).catch(e =>{
        console.error(e)
    })
}