/**
 *  EventsMap 类型必须包含 TriggersMap 类型的所有属性.
 */
export interface IEventHandle<TriggersMap, EventsMap extends {
    [N in keyof TriggersMap]: EventsMap[N];
}> {
    /**
     * 添加时间监听.
     * @param name 时间名称
     * @param callback
     */
    addListener<N extends keyof EventsMap>(name: N, callback: (info?: EventsMap[N]) => void): void;
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
     * 清除监听事件.
     */
    clearListener(): void;
}
