export interface WaveRenderEvents {
    click: WaveClickEvent;
    wheel: WaveWheelEvent;
}
export interface WaveClickEvent {
    /**
       * the percent of curent duration.
       */
    totalPercent: number;
}
export interface WaveWheelEvent {
    /**
 * the percent of curent duration.
 */
    totalPercent: number;
    /**
     * the start view duration percent.
     */
    startPercent: number;
    /**
     * the end view duration percent.
     */
    endPercent: number;
    isScale: boolean;
}
export declare class WaveRenderEventsTrigger {
    click: WaveClickEventTrigger;
    wheel: WaveWheelEventTrigger;
}
export interface WaveClickEventTrigger {
    /**
     * the click point X in the view width percent.
     */
    viewPercent?: number;
    /**
     * the click event trigger by dom.
     */
    event?: Event;
}
export interface WaveWheelEventTrigger {
    /**
    * the wheel point X in the view width percent.
    */
    viewPercent?: number;
    /**
     * the wheel event trigger by dom.
     */
    event?: WheelEvent;
    /**
     * 是否为放大.
     */
    isScale?: boolean;
}
