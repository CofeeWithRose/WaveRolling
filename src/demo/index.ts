import {  WaveRolling } from '../';
import {stringify} from 'qs';

export function DataTransformer(url:string, data: any, method: "GET" | "PUT" | "DELETE" | "POST"){
    url = url || '';
    if( !method ||'GET' === method ){
        data = data instanceof FormData? null:  stringify(data);
        url = `${url}?${data}`;
        data = null;
    }else{
        data = data instanceof FormData? data :  stringify(data);
    }
    return { 
        url,
        fetchOptions: { body: data },  
    };
}

// use Plugin to tanslate data, it will effect the action  WaveVisual.
WaveRolling.use({DataTransformer});



/**
 * instance wa
 */
const waveRolling = WaveRolling.create(
    document.querySelector('#container'),
    { 
        color: [{ offset: 0.2, value: '#ff7373' }, '#37f5e3', '#fb8531'],
        scalable: true,
    }
);

(<any>window).onSelect = function onSelect(event: Event){

    if(!(<any>event.target).files[0]) return;
    if(waveRolling){
        waveRolling.abort()
    }
    const reader = new FileReader();
    
    waveRolling.onabort = () => reader.abort();

    reader.onload = () => waveRolling.loadBlob(<ArrayBuffer>reader.result);

    reader.readAsArrayBuffer((<any>event.target).files[0]);
};


(<any>window).onLoadAudio = function onLoadAudio(){
    const data = {param1:1, param:2};
    waveRolling.load(`source/${(<HTMLInputElement>document.querySelector('#input')).value}.wav`, {data});
};





