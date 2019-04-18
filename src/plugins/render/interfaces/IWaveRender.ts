import { IEventHandle } from "../../../main/interfaces/IEventHandle";

export interface WaveRenderOptions{

    color?: string|Array<string|{offset: number, value: string }>;
    
}


export interface WaveRenderEvents {

    click: { totalPercent: number };

    wheel: { totalPercent: number, startPercent: number, endPercent: number };
    
}

export interface WaveRenderEventsTrigger {

    click: { viewPercent: number };

    wheel: { viewPercent: number };
}


/**
 *  rend the data in browser.
 */
export interface IWaveRender extends IEventHandle< WaveRenderEventsTrigger, WaveRenderEvents> {
 

    init(container: HTMLElement, options?: WaveRenderOptions):void;
    
    reset(): void;

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;

    clear(): void;

}