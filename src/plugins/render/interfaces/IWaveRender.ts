import { IEventHandle } from "../../../main/interfaces/IEventHandle";
import { WaveRenderEventsTrigger, WaveRenderEvents } from "./IWaveRenderEvents";

export interface WaveRenderOptions{

    color?: string|Array<string|{offset: number, value: string }>;
    
}


// export interface WaveRenderEvents {

//     click: { 
        
//         /**
//          * the percent of curent duration. 
//          */
//         totalPercent: number
//     };

//     wheel: {
//         /**
//          * the percent of curent duration. 
//          */
//         totalPercent: number, 
        
//         /**
//          * the start view duration percent.  
//          */
//         startPercent: number, 

//         /**
//          * the end view duration percent.
//          */
//         endPercent: number 
//     };
    
// }

// export interface WaveRenderEventsTrigger {

//     click: ClickEventTrigger;

//     wheel: WheelEventTrigger;
// }

// export interface ClickEventTrigger{
//     /**
//      * the click point X in the view width percent.
//      */
//     viewPercent?: number,

//     /**
//      * the click event trigger by dom.
//      */
//     event?: Event,
// }

// export interface WheelEventTrigger{
//         /**
//         * the wheel point X in the view width percent.
//         */
//        viewPercent?: number,

//        /**
//         * the wheel event trigger by dom.
//         */
//        event?: Event,
// }

/**
 *  rend the data in browser.
 */
export interface IWaveRender extends IEventHandle< WaveRenderEventsTrigger, WaveRenderEvents> {
 

    init(container: HTMLElement, options?: WaveRenderOptions):void;
    
    reset(): void;

    render(audioBuffer: AudioBuffer, startPercent: number, endPercent: number): void;

    clear(): void;

}