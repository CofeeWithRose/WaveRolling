import { IWaveRender, WaveRenderOptions, IWaveRenderEvents } from "../interface/IWaveRender";
import { IEmiter } from "../../../util/event_emiter/IEmiter";
import { Emiter } from "../../../util/event_emiter/Emiter";

export abstract class AWaveRender implements IWaveRender{

    constructor(){};

    private listeners:IEmiter = new Emiter();

    abstract  init(container: HTMLElement, options?: WaveRenderOptions):void;
    
    abstract reset(): void;

    abstract render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;

    abstract clear(): void;

    addListener<N extends keyof IWaveRenderEvents>( name: N, callback: ( info?: IWaveRenderEvents[N]) => void ): void{
        this.listeners.addListener(name, callback);
    };

    removeListener<N extends keyof IWaveRenderEvents>( name: N, callback: ( info?: IWaveRenderEvents[N]) => void): void {
        this.listeners.removeListener( name, callback);
    };

    trigger<N extends keyof IWaveRenderEvents>(name: N,  info?: IWaveRenderEvents[N]): void{
        this.listeners.emit(name, info);
    };

}