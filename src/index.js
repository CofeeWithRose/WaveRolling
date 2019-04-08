// import { WavDecoder } from './util/WavDecoder.js';
// import { WaveRender } from './util/WaveRender.js';
import { WaveVisual } from './WaveVisual.js';

const waveVisual = new WaveVisual(document.querySelector('#container'));

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


window.onLoadAudio = function onLoadAudio(url){
    waveVisual.load(url);
}
