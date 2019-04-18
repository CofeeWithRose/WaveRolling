import { DataBufferRange, DecodedInfo, IWavDecoder, WaveDecoderEventsTrigger, WaveDecoderEvents } from "../interfaces/IWavDecoder";
import { EventHandle } from "../../../main/implements/EventHandle";


/**
* An audio progresive decoder, only surport wav format in pacm encoding.
*/
export class WavDecoder extends EventHandle<WaveDecoderEventsTrigger, WaveDecoderEvents> implements IWavDecoder {

    constructor(){
        super();

        this.setTriggerProcesser('process', decodeInfo => decodeInfo);
        this.setTriggerProcesser('waitting', () => {} );
        this.setTriggerProcesser('complete', () => {} );
        this.setTriggerProcesser('abort', () => {});
        this.setTriggerProcesser( 'error', error =>　error );

        this.addListener('process', info => this.onprocess(info));
        this.addListener('waitting', () => this.onwaitting());
        this.addListener('complete', () => this.oncomplete());
        this.addListener('abort', () => this.onabort());
        this.addListener('error', error => this.onerror(error));
    }

    /**
     * the decoded data byte length of input ArrayBuffer.
     */
    private decodedDataByteLength: number;

    private audioContext: OfflineAudioContext;

    private headerBuffer: ArrayBuffer;


    private perDataBufferPiceLength: number;


    private dataBufferCache: Array<ArrayBuffer>;

    private dataBufferRangeList: Array<DataBufferRange>;

    private cachedDataByteLength: number;

    private totalDataBufferLength: number;

    private tempBufferRange: DataBufferRange;

    private lastCacheIndex: number;

    private cacheOffset: number;

    private byteSpeed: number;

    private duration: number;

    private dataLengthOffset: number;

    /**
     * start decode when this method execute, if this method excute more than once, nothing will happend.
     * 
     * @param {ArrayBuffer} firstPiceArrayBuffer the first splice ArrayBuffer of wave audio data from xhr\fetch\file,
     *  also receive the whole ArrayBuffer.
     */
    decode(firstPiceArrayBuffer: ArrayBuffer) {

        this.dataBufferCache = [];

        this.dataBufferRangeList = [];

        const { sampleRate, numOfChannels, headBuffer, dataBuffer, totalDataByteLength, bitWide, byteSpeed, duration } = this.getWavInfo(firstPiceArrayBuffer);

        this.perDataBufferPiceLength = 1 * sampleRate * numOfChannels * bitWide/8;

        this.byteSpeed = byteSpeed;

        this.duration = duration;

	let OfflineAudioContext = (<any>window).OfflineAudioContext||(<any>window).webkitOfflineAudioContext;
	if(!OfflineAudioContext){
	    this.onerror(new Error('Not Suport Error'));
	    throw 'Not Suport Error';
	}
        this.audioContext = new OfflineAudioContext(1, this.perDataBufferPiceLength, 44100);

        this.totalDataBufferLength = totalDataByteLength;

        this.headerBuffer = headBuffer;
        this.decodedDataByteLength = 0;
        this.lastCacheIndex = 0;

        this.cachedDataByteLength = 0;

        this.cacheOffset = 0;

        this.cacheDataBufferList(dataBuffer);
        this.decodeBufferPice();
        this.decode = () => { };

    }

    /**
    * add the rest data to decode.
    *  
    * @param {ArrayBuffer} buffer the next pices ArrayBuffer of wave audio, you can append several times before complete,
    * when you append extra data, it will be iignore.
    */
    appendBuffer(buffer: ArrayBuffer) {
        const isCacheComplete = this.cachedDataByteLength >= this.totalDataBufferLength;
        const isWaitting = !this.dataBufferRangeList.length;
        this.cacheDataBufferList(buffer);
        if (!isCacheComplete && isWaitting) {
            this.decodeBufferPice();
        }
    }

    abort() {
        this.release();
        this.trigger('abort');
    }

    private release(){

        this.dataBufferCache = null;
        this.dataBufferRangeList = null;


        this.perDataBufferPiceLength = null;

        this.byteSpeed = 0;

        this.duration = 0;

        this.audioContext = null;

        this.totalDataBufferLength = 0;

        this.headerBuffer = null;
        this.decodedDataByteLength = 0;
        this.lastCacheIndex = 0;

        this.cachedDataByteLength = 0;

        this.cacheOffset = 0;
        this.clearListener();
        this.decodeBufferPice = () => { }
        this.appendBuffer = () => { }
        this.onprocess = () => { }
        this.onwaitting = () => { }

    }

    private cacheDataBufferList(bufferPiece: ArrayBuffer) {


        this.dataBufferCache.push(bufferPiece);

        const cacheIndex = this.dataBufferCache.length - 1;

        let offset = 0;

        if (this.tempBufferRange) {

            const maxLength = this.totalDataBufferLength - this.cachedDataByteLength;
            let needLength = this.perDataBufferPiceLength - this.tempBufferRange.length;
            needLength = needLength <= maxLength ? needLength : maxLength;
            if (bufferPiece.byteLength >= needLength) {
                this.tempBufferRange.segments.push({ cacheIndex, offset, length: needLength, cacheOffset: this.cacheOffset })
                this.tempBufferRange.length += needLength;
                this.cachedDataByteLength += needLength;
                offset += needLength;
                this.dataBufferRangeList.push(this.tempBufferRange);

                this.tempBufferRange = null;
            } else {
                this.tempBufferRange.segments.push({ cacheIndex, offset, length: bufferPiece.byteLength, cacheOffset: this.cacheOffset });
                this.tempBufferRange.length += bufferPiece.byteLength;
                this.cachedDataByteLength += bufferPiece.byteLength;
                offset += bufferPiece.byteLength;
            }

        }
        const segmentNumber = Math.floor((bufferPiece.byteLength - offset) / this.perDataBufferPiceLength);

        for (let i = 0; i < segmentNumber; i++) {

            this.dataBufferRangeList.push({
                segments: [{ cacheIndex, offset, length: this.perDataBufferPiceLength, cacheOffset: this.cacheOffset }],
                length: this.perDataBufferPiceLength,
            })
            offset += this.perDataBufferPiceLength;
            this.cachedDataByteLength += this.perDataBufferPiceLength;
        }

        const restCacheLength = bufferPiece.byteLength - offset;
        if (restCacheLength) {

            if (this.cachedDataByteLength + restCacheLength >= this.totalDataBufferLength) {
                const length = this.totalDataBufferLength - this.cachedDataByteLength;
                this.dataBufferRangeList.push({
                    segments: [{ cacheIndex, offset, length, cacheOffset: this.cacheOffset }],
                    length,
                });
                this.cachedDataByteLength = this.totalDataBufferLength;
            } else {
                const length = bufferPiece.byteLength - offset;
                this.tempBufferRange = {
                    segments: [{ cacheIndex, offset, length, cacheOffset: this.cacheOffset }],
                    length,
                }
                this.cachedDataByteLength += length
            }
        }

    }


    private decodeBufferPice() {

        const dataRange = this.dataBufferRangeList.shift();
        if (dataRange) {
            const audioData = this.getRangeAuidoBuffer(dataRange);
            // const audio = document.createElement('audio');
            // audio.controls = true;
            // audio.src = URL.createObjectURL(new File([audioData], 'audio.wav',{type: 'audo/wav'}));
            // document.body.appendChild(audio);
            this.audioContext.decodeAudioData(audioData, audioBuffer => {
                const startTime = this.decodedDataByteLength/this.byteSpeed;
                this.decodedDataByteLength += dataRange.length;
                const isComplete = this.decodedDataByteLength >= this.totalDataBufferLength;
                if(!isComplete){
                    this.decodeBufferPice();
                }
                this.trigger('process', {
                    audioBuffer,
                    startTime,
                    endTime: this.decodedDataByteLength/this.byteSpeed,
                    duration: this.duration,
                });
                if (isComplete) {
                    this.dataBufferCache = null;
                    this.trigger('complete');
                    this.release();
                }

            }, (error) =>this.trigger('error', error));
        } else {
            this.trigger('waitting');
        }
    }

    private getRangeAuidoBuffer({ segments, length: rangeLength }: DataBufferRange) {
        const dataBuffer = new ArrayBuffer(this.headerBuffer.byteLength + rangeLength);
        const dataView = new Uint8Array(dataBuffer);
        let viewOffset = 0;

        this.setWavHeadDataLength(rangeLength);
        const headView = new Uint8Array(this.headerBuffer);
        dataView.set(headView);
        viewOffset += this.headerBuffer.byteLength;

        segments.forEach(({ cacheIndex, offset, length, cacheOffset }) => {

            if (cacheIndex - cacheOffset != this.lastCacheIndex) {
                this.dataBufferCache.shift();
                this.cacheOffset--;
                this.lastCacheIndex = cacheIndex - cacheOffset;
            }
            const curCacheIndex = cacheIndex + this.cacheOffset - cacheOffset;
            const buffer = this.dataBufferCache[curCacheIndex];
            const view = new Uint8Array(buffer, offset, length);
            dataView.set(view, viewOffset);
            viewOffset += length
        });

        return dataBuffer;
    }



    private setWavHeadDataLength(byteLength: number) {
        const view = new DataView(this.headerBuffer);
        view.setUint32(this.dataLengthOffset, byteLength, true);
    }

    private getWavInfo(buffer: ArrayBuffer) {

        const view = new DataView(buffer);
        const RIFF = this.getString(view, 0, 4);
        const WAVE = this.getString(view, 8, 4);
        // const encodeType = view.getUint16(20, true);
        if ('RIFF' !== RIFF || 'WAVE' !== WAVE ) {
            this.trigger('error', new Error('Format Error.'));
            throw 'Format Error';
        }
        this.dataLengthOffset = this.getDataOffset(view);
        const totalDataByteLength = view.getUint32(this.dataLengthOffset, true);
        const numOfChannels = view.getUint16(22, true);
        const bitWide = view.getUint16(34, true);
        const sampleRate = view.getUint32(24, true);
        const byteSpeed = view.getUint32( 28, true);
        const headBuffer = buffer.slice(0, this.dataLengthOffset + 4);
        const dataBuffer = buffer.slice(this.dataLengthOffset + 4, this.dataLengthOffset + 4 + totalDataByteLength);
        return {
            bitWide,
            sampleRate,
            numOfChannels,
            headBuffer,
            dataBuffer,
            totalDataByteLength,
            byteSpeed,
            duration: totalDataByteLength/byteSpeed,
        };
    }

    private getDataOffset(headView: DataView) {

        let offset = 16 + 4 + headView.getUint32(16, true);
        let flag = '';
        while (true) {
            flag = this.getString(headView, offset, 4);
            if ('data' === flag) {
                return 4 + offset;
            } else {
                offset += headView.getUint32(offset + 4, true) + 4 + 4;
            }
        }
    }

    private getString(dataview: DataView, offset: number, length: number) {
        let str = '';
        for (let extraOffset = 0; extraOffset < length; extraOffset++) {
            str += String.fromCharCode(dataview.getUint8(offset + extraOffset));
        }
        return str;
    }

    onprocess(info: DecodedInfo) {

    }

    onwaitting() {

    }

    oncomplete() {

    }

    onabort() {

    }

    onerror(error: Error) {
        console.error(error);
    }
}
