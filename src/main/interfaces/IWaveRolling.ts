import { DataTransformer } from '../../plugins/data_transformer/DataTransformer';
import {  IWaveRender, WaveRenderOptions } from '../../plugins/render/interfaces/IWaveRender';
import { WavDecoder } from '../../plugins/decoder/implements/WavDecoder';
import { WaveRender } from '../../plugins/render/implements/CanvasWaveRender';
import { IWavDecoder, WaveDecoderEventsTrigger, WaveDecoderEvents } from '../../plugins/decoder/interfaces/IWavDecoder';
import { SVGWaveRender } from '../../plugins/render/implements/SVGWaveRender';
import { IEventHandle } from './IEventHandle';
import { WaveRenderEvents, WaveRenderEventsTrigger } from '../../plugins/render/interfaces/IWaveRenderEvents';

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