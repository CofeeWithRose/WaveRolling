import { DecodedInfo, IWavDecoder, WaveDecoderEventsTrigger, WaveDecoderEvents } from "../interfaces/IWavDecoder";
import { EventHandle } from "../../../main/implements/EventHandle";
/**
* An audio progresive decoder, only surport wav format in pacm encoding.
*/
export declare class WavDecoder extends EventHandle<WaveDecoderEventsTrigger, WaveDecoderEvents> implements IWavDecoder {
    constructor();
    /**
     * the decoded data byte length of input ArrayBuffer.
     */
    private decodedDataByteLength;
    private audioContext;
    private headerBuffer;
    private perDataBufferPiceLength;
    private dataBufferCache;
    private dataBufferRangeList;
    private cachedDataByteLength;
    private totalDataBufferLength;
    private tempBufferRange;
    private lastCacheIndex;
    private cacheOffset;
    private byteSpeed;
    private duration;
    private dataLengthOffset;
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
    private release;
    private cacheDataBufferList;
    private decodeBufferPice;
    private getRangeAuidoBuffer;
    private setWavHeadDataLength;
    private getWavInfo;
    private getDataOffset;
    private getString;
    onprocess(info: DecodedInfo): void;
    onwaitting(): void;
    oncomplete(): void;
    onabort(): void;
    onerror(error: Error): void;
}
