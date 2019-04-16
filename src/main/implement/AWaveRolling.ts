import { WaveRollingPlugins, WaveRollingOptions } from "../interface/IWaveRolling";
import { WavDecoder } from "../../plugins/implement/WavDecoder";
import { WaveRender } from "../../plugins/implement/WaveRender";
import { HDWaveRender } from "../../plugins/implement/HDWaveRender";
import { DataTransformer } from "../../plugins/implement/DataTransformer";
import { IWaveRender } from "../../plugins/interface/IWaveRender";
import { IWavDecoder } from "../../plugins/interface/IWavDecoder";
import { WaveRolling } from "../..";

let PLUGINS: WaveRollingPlugins = {

    Decorder: WavDecoder,
    
    Render: WaveRender,
    
    HDRender: HDWaveRender,

    DataTransformer,

}

export abstract class AWaveRolling {

   protected constructor(){

   }

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



    protected init(containner: HTMLElement, options: WaveRollingOptions){
        this.plugins = { ...PLUGINS };
        const { color } = options || { color: 'black' };
        this.render = new this.plugins.Render();
        this.render.init( containner, { color } );
    }

}