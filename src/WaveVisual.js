import { WavDecoder } from './util/WavDecoder.js';
import { WaveRender } from './util/WaveRender.js';

export class WaveVisual{

    
    /**
     * @param { HTMLElement } containner 
     * @param { {color} } options 
     */
    constructor(containner, options){
        const { color } = options||{};
        this._waveRender = new WaveRender( containner, { color } );
    }

    // _waveRender;
    // _decoder;

    /**
     * 
     * @param { string| ArrayBuffer } audioUrl 
     * @param { object } data 
     * @param { 'GET'|'POST'} method 
     */
    load(audioUrl, data, method){

        if(this._decoder){
            this._decoder.abort();
        }
        this._decoder = new WavDecoder();
        
        this._waveRender.clear();
        this._waveRender.drawCenterLine();
        this._decoder.onprocess = data => {
            this._waveRender.render( data.data, data.rangeStart/data.total,  data.rangeEnd/data.total );
        }
        this._decoder.onerror = this.onerror;
        if(audioUrl instanceof ArrayBuffer){
            this._decoder.decode(audioUrl);
        }else{
            this._loadAudio(audioUrl, data, method);
        }
        
    }


    abort(){
        if(this._decoder){
            this._decoder.abort();
        }
    }

    onerror(error){
        console.error(error);
    }

    onabort(){
        console.warn('WaveVisual abort.');
    }


    _loadAudio(url, data, method ){


        const controller = new AbortController()
        const signal = controller.signal;
        const option = {
            signal,
            method: method||'GET',
            body: data instanceof FormData? data : JSON.stringify(data),
        }
        fetch(url,option).then( rsp => {
    
            const fetchReader = rsp.body.getReader();
    
            this._decoder.onwaitting = () => fetchReader.read().then(data => {
                if(!data.done){
                    const buffer = new ArrayBuffer(data.value.length);
                    const view = new Uint8Array(buffer);
                    view.set(data.value);
                    this._decoder.appendBuffer(buffer);
                    
                }
    
            }).catch(e => {
                console.error(e);
            });
            this._decoder.onabort = () => { 
                controller.abort(); 
                fetchReader.cancel();
                this.onabort(); 
            };
    
            fetchReader.read().then( data => {
                const buffer = new ArrayBuffer(data.value.length);
                const view = new Uint8Array(buffer);
                view.set(data.value);
                this._decoder.decode(buffer);
            });
    
                
    
        }).catch(e =>{
            console.error(e)
        })
    }
}