import { WaveVisual } from './WaveVisual.js';
// import qs from 'qs'

// export function DataTransformer(url, data, method){
//     url = url || '';
//     if( !method ||'GET' === method ){
//         data = data instanceof FormData? null:  qs.stringify(data);
//         url = `${url}?${data}`;
//         data = null;
//     }else{
//         data = data instanceof FormData? data :  JSON.stringify(data);
//     }
//     return { url, body: data };
// }
// WaveVisual.use({DataTransformer});

const waveVisual = new WaveVisual(document.querySelector('#container'),{ color: '#37f5e3'});
window.onSelect = function onSelect(event){
    if(!event.target.files[0]) return;
    if(waveVisual){
        waveVisual.abort()
    }
    const reader = new FileReader();
    waveVisual.onabort = () => reader.abort();
    reader.onload = () => {
        waveVisual.load(reader.result);
    }
    reader.readAsArrayBuffer(event.target.files[0]);
}


window.onLoadAudio = function onLoadAudio(){
    
    waveVisual.load(`./source/${document.querySelector('#input').value}.wav`,{a:1,b:2});
}





