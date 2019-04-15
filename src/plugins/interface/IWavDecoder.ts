
export interface RangeSegment{
    cacheIndex: number;
    offset: number;
    length: number;
    cacheOffset: number;
}
export interface DataBufferRange{
    length: number;
    segments: Array<RangeSegment>;
}

export interface DecodedInfo {
        audioBuffer: AudioBuffer,
        startTime: number,
        endTime: number,
        duration: number,
}


/**
* An audio progresive decoder, only surport wav format in pacm encoding.
*/
export interface IWavDecoder {

   

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
