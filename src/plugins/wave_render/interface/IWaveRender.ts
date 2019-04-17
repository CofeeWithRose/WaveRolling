
export interface WaveRenderOptions{

    color?: string|Array<string|{offset: number, value: string }>;
    
}

export interface IWaveRenderEvents {

    click: { currentPercent: number };

    wheel: { currentPercent: number };
    
}

/**
 * create canvas and rend the data of audo on it.
 */
export interface IWaveRender {
 

    init(container: HTMLElement, options?: WaveRenderOptions):void;
    
    reset(): void;

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;

    clear(): void;

    addListener<N extends keyof IWaveRenderEvents>( name: N, callback: ( info?: IWaveRenderEvents[N]) => void ): void;

    removeListener<N extends keyof IWaveRenderEvents>( name: N, callback: ( info?: IWaveRenderEvents[N]) => void): void;

    trigger<N extends keyof IWaveRenderEvents>(name: N,  info?: IWaveRenderEvents[N]): void;

}