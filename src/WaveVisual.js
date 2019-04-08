import { WavDecoder } from './plugins/WavDecoder.js';
import { WaveRender } from './plugins/WaveRender.js';
import { DataTransformer } from './plugins/DataTransformer.js';

const PLUGINS = {
    Decorder: WavDecoder,
    Render: WaveRender,
    DataTransformer,
}

export class WaveVisual {
    
    /**
     * @param { HTMLElement } containner 
     * @param { {color} } options 
     */
    constructor(containner, options){
        const { color } = options||{};
        this._waveRender = new PLUGINS.Render( containner, { color } );
    }

    // _waveRender;
    // _decoder;

    /**
     * use pugins, it will effect all the instance of WaveVisual.
     * 
     * @param { { Decorder?, Render?, DataTransformer? } } plugins. 
     */
    static use(plugins){
        const plugsKeys = Object.keys(plugins||{});
        const extraPluginKesy = plugsKeys.filter( name => PLUGINS[name]);
        if(extraPlugin.length){
            throw `[ ${ extraPluginKesy.join(' , ') } ] is not support.` 
        }
        PLUGINS = {
            ...PLUGINS,
            ...plugins,
        }
    }

    /**
     * list all plugins.
     */
    static plugins(){
        return { ...PLUGINS };
    }

    /**
     * 
     * @param { string| ArrayBuffer } audioUrl 
     * @param { object } data 
     * @param { 'GET'|'POST'|'PUT'|'DELETE'} method 
     */
    load(audioUrl, data, method){

        if(this._decoder){
            this._decoder.abort();
        }
        this._decoder = new PLUGINS.Decorder();
        
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
        this.onabort();
    }

    onerror(error){
        console.error(error);
    }

    onabort(){
        // console.warn('WaveVisual abort.');
    }


    _loadAudio(srcUrl, srcData, method ){
        const controller = new AbortController()
        const signal = controller.signal;
        const { url, body } = PLUGINS.DataTransformer( srcUrl, srcData, method  );
        const option = {
            signal,
            method,
            body,
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
                fetchReader.cancel().catch( error => {
                    console.warn('WaveVisual load canceld.');
                });
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