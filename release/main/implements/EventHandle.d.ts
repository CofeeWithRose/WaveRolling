import { IEventHandle } from "../interfaces/IEventHandle";
export declare class EventHandle<TriggersMap, EventsMap extends {
    [N in keyof TriggersMap]: EventsMap[N];
}> implements IEventHandle<TriggersMap, EventsMap> {
    constructor();
    private triggerProcess;
    private listeners;
    /**
   * 添加时间监听.
   * @param name 时间名称
   * @param callback
   */
    addListener<N extends keyof EventsMap>(name: N, callback: (info: EventsMap[N]) => void): void;
    /**
     * 移除事件监听.
     * @param name
     * @param callback
     */
    removeListener<N extends keyof EventsMap>(name: N, callback: (info?: EventsMap[N]) => void): void;
    /**
     * 触发时间监听.
     * @param name
     * @param info
     */
    trigger<N extends keyof TriggersMap>(name: N, info?: TriggersMap[N]): void;
    /**
     * 向trigger中添加转换函数，将 trigger 的入参转换为 event 的入参.
     * @param name
     * @param fun
     */
    protected setTriggerProcesser<N extends keyof TriggersMap>(name: N, fun: (param: TriggersMap[N]) => EventsMap[N]): void;
    clearListener(): void;
}
