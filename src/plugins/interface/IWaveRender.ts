
export interface WaveRenderOptions{

    color?: string|Array<string>|Array<string|{offset: number, value: string }>;
    
}


/**
 * create canvas and rend the data of audo on it.
 */
export interface IWaveRender {
 

    init(container: HTMLElement, options?: WaveRenderOptions):void;
    
    reset(): void;

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;

    clear(): void;


}