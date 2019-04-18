import { DataTransformer } from '../../plugins/data_transformer/DataTransformer';
import { WaveRenderOptions, IWaveRender, WaveRenderEvents, WaveRenderEventsTrigger } from '../../plugins/render/interface/IWaveRender';
import { WavDecoder } from '../../plugins/decoder/implement/WavDecoder';
import { WaveRender } from '../../plugins/render/implement/CanvasWaveRender';
import { IWavDecoder, WaveDecoderEventsTrigger, WaveDecoderEvents } from '../../plugins/decoder/interface/IWavDecoder';
import { SVGWaveRender } from '../../plugins/render/implement/SVGWaveRender';
import { IEventHandle } from './IEventHandle';

let PLUGINS: WaveRollingPlugins = {

    Decorder: WavDecoder,
    
    Render: WaveRender,
    
    HDRender: SVGWaveRender,

    DataTransformer,

}
export interface WaveRollingOptions extends WaveRenderOptions{

    /**
     * 是否可缩放
     */
    scalable?: boolean;
}

export interface WaveRollingLoadOptions {
    
    data?: object;
    
    method?: 'GET'|'POST'|'PUT'|'DELETE';
}

export interface WaveRollingPlugins {

    Decorder?: new  ()=>  IWavDecoder;

    Render?: new () => IWaveRender;

    HDRender?: new () => IWaveRender;

    DataTransformer?:   ( url: string, data: any, method: 'GET'|'POST'|'PUT'|'DELETE' ) => 
                        { url: string, fetchOptions: RequestInit };
    
}

export type WaveRollingEvents =  WaveRenderEvents & WaveDecoderEvents;

export type WaveRollingEventsTrigger = WaveRenderEventsTrigger & WaveDecoderEventsTrigger;

export interface IWaveRolling extends IEventHandle<WaveRollingEventsTrigger, WaveRollingEvents>{


    /**
     * load resouce and draw wave in canvas.
     * 
     * @param audioUrl 
     * @param options 
     */
    load(audioUrl: string, options?: WaveRollingLoadOptions): void;

    loadBlob(arrayBuffer: ArrayBuffer): void;

    /**
     * it can be user only after load ArrayBuffer.
     * @param {ArrayBuffer} arrayBuffer 
     */
    append(arrayBuffer: ArrayBuffer): void;

    abort(): void;

    onerror(error: Error): void;
    
    onabort(): void;

}