import { IEventHandle } from "../../../main/interfaces/IEventHandle";

export interface RangeSegment{
    cacheIndex: number;
    offset: number;
    length: number;
    cacheOffset: number;
}
export class DataBufferRange{
    length = 0;
    segments = new Array<RangeSegment>();
}

export interface DecodedInfo {
        audioBuffer: AudioBuffer,
        startTime: number,
        endTime: number,
        duration: number,
}

/**
 * 
 * the events in decoder.
 * 
 * 解码器事件.
 */
export interface WaveDecoderEvents {
    
    error:  Error;

    abort: void;

    process: DecodedInfo;

    waitting: void;

    complete: void;
    
}

/**
 * triggerable events.
 * 
 * 可以触发的解码器事件.
 */
export class WaveDecoderEventsTrigger {
    
    error:  Error;

    abort: void;

    process: DecodedInfo;

    waitting: void;

    complete: void;
    
}

/**
* An audio progresive decoder, only surport wav format in pacm encoding.
*/
export interface IWavDecoder extends IEventHandle<WaveDecoderEventsTrigger, WaveDecoderEvents> {

   

    /**
     * start decode when this method execute, if this method excute more than once, nothing will happend.
     * 
     * @param {ArrayBuffer} firstPiceArrayBuffer the first splice ArrayBuffer of wave audio data from xhr\fetch\file,
     *  also receive the whole ArrayBuffer.
     */
    decode(firstPiceArrayBuffer: ArrayBuffer): void;

    /**
    * add the rest data to decode.
    *  
    * @param {ArrayBuffer} buffer the next pices ArrayBuffer of wave audio, you can append several times before complete,
    * when you append extra data, it will be iignore.
    */
    appendBuffer(buffer: ArrayBuffer): void;

    abort(): void;


    onprocess(info: DecodedInfo): void;

    onwaitting(): void;

    oncomplete(): void;

    onabort(): void;

    onerror(error: Error): void;
}
