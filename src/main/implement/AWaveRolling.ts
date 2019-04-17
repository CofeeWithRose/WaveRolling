import { WaveRollingPlugins, WaveRollingOptions, IWaveRolling, WaveRollingEvents } from "../interface/IWaveRolling";
import { WavDecoder } from "../../plugins/decoder/implement/WavDecoder";
import { WaveRender } from "../../plugins/wave_render/implement/WaveRender";
import { SVGWaveRender } from "../../plugins/wave_render/implement/SVGWaveRender";
import { DataTransformer } from "../../plugins/data_transformer/DataTransformer";
import { IWaveRender } from "../../plugins/wave_render/interface/IWaveRender";
import { IWavDecoder } from "../../plugins/decoder/interface/IWavDecoder";
import { Emiter } from "../../util/event_emiter/Emiter";
import { IEmiter } from "../../util/event_emiter/IEmiter";

let PLUGINS: WaveRollingPlugins = {

    Decorder: WavDecoder,
    
    Render: WaveRender,
    
    HDRender: SVGWaveRender,

    DataTransformer,

}

export abstract class AWaveRolling implements IWaveRolling {

   protected constructor(){

   }

   protected listeners: IEmiter = new Emiter();

    protected plugins: WaveRollingPlugins;

    protected render: IWaveRender;
    
    protected decoder: IWavDecoder;

    /**
     * after use pugins, it will effect all the instance of WaveVisual later.
     * 
     * @param { { Decorder?, Render?, DataTransformer? } } plugins. 
     */
    static use(plugins: WaveRollingPlugins){
        
        const plugsKeys = Object.keys(plugins||{});
        const extraPluginKeys = plugsKeys.filter( name => !(<any>PLUGINS)[name]);
        if(extraPluginKeys.length){
            throw `[ ${ extraPluginKeys.join(' , ') } ] is not support.` 
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


    protected init(containner: HTMLElement, options?: WaveRollingOptions){
        this.plugins = { ...PLUGINS };
        const { color, scalable } = options||{ color: '', scalable: false };
        this.render = scalable? new this.plugins.HDRender() : new this.plugins.Render();
        this.render.init( containner, { color } );
    }

    addListener<N extends keyof WaveRollingEvents>( name: N, callback: ( info?: WaveRollingEvents[N]) => void ): void{
        this.listeners.addListener(name, callback);
    }

    removeListener<N extends keyof WaveRollingEvents>( name: N, callback: ( info?: WaveRollingEvents[N]) => void): void{
        this.listeners.removeListener( name, callback);
    };

    trigger<N extends keyof WaveRollingEvents>(name: N,  info?: WaveRollingEvents[N]): void{
        this.listeners.emit(name, info);
    };

    abstract load(url: string): void;

    abstract loadBlob(arrayBuffer: ArrayBuffer): void;

    abstract append(arrayBuffer: ArrayBuffer): void;

    abstract abort(): void;

    abstract onerror(error: Error): void;
    
    abstract onabort(): void;

}