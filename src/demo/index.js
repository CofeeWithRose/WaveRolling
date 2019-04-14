import {  WaveRolling } from '../index';
import qs from 'qs'

export function DataTransformer(url, data, method){
    url = url || '';
    if( !method ||'GET' === method ){
        data = data instanceof FormData? null:  qs.stringify(data);
        url = `${url}?${data}`;
        data = null;
    }else{
        data = data instanceof FormData? data :  qs.stringify(data);
    }
    return { 
        url,
        fetchOptions: { body: data }  
    };
}

// use Plugin to tanslate data, it will effect the action  WaveVisual.
WaveRolling.use({DataTransformer});



/**
 * instance wa
 */
const waveRolling = new WaveRolling(document.querySelector('#container'),{ color: [{ offset: 0.2, value: '#ff7373' }, '#37f5e3', '#fb8531']});

window.onSelect = function onSelect(event){

    if(!event.target.files[0]) return;
    if(waveRolling){
        waveRolling.abort()
    }
    const reader = new FileReader();
    
    waveRolling.onabort = () => reader.abort();

    reader.onload = () => waveRolling.load(reader.result);

    reader.readAsArrayBuffer(event.target.files[0]);
}


window.onLoadAudio = function onLoadAudio(){
    const data = {param1:1, param:2};
    waveRolling.load(`source/${document.querySelector('#input').value}.wav`, {data});
}





