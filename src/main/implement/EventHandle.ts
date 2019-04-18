import { IEventHandle } from "../interface/IEventHandle";
import { Emiter } from "../../util/event_emiter/Emiter";
import { IEmiter } from "../../util/event_emiter/IEmiter";

export class EventHandle<TriggersMap, EventsMap extends {[N in keyof TriggersMap]: EventsMap[N]}> implements IEventHandle<TriggersMap,EventsMap>{

    constructor(){ }

    
    // private triggerProcess:{[P in keyof TriggersMap]: (param?: TriggersMap[P]) => EventsMap[P]};
    private triggerProcess:{[index: string]: <N extends keyof TriggersMap>(param?: TriggersMap[N]) => EventsMap[N]} = {};

    private listeners:IEmiter = new Emiter();

      /**
     * 添加时间监听.
     * @param name 时间名称
     * @param callback 
     */
    addListener<N extends keyof EventsMap>( name: N, callback: ( info?: EventsMap[N]) => void ): void{
        document.body.click
        this.listeners.addListener(<string>name, callback);
    };


    /**
     * 移除事件监听.
     * @param name 
     * @param callback 
     */
    removeListener< N extends keyof EventsMap >( name: N, callback: ( info?: EventsMap[N]) => void): void{
        // this.listeners.removeListener( name, callback);
    };

    /**
     * 触发时间监听.
     * @param name 
     * @param info 
     */
    trigger<N extends keyof TriggersMap>(name: N,  info?: TriggersMap[N]): void{
        const fun = <( param?: TriggersMap[N]) => EventsMap[N]>this.triggerProcess[<string>name];
        if(fun){
            this.listeners.emit(<string>name, fun(info));
        }else {
            console.warn(`Trigger Error. you must setTriggerProcesser for [ ${name} ].`);
        } 
    };

    /**
     * 向trigger中添加转换函数，将 trigger 的入参转换为 event 的入参.
     * @param name 
     * @param fun 
     */
    protected setTriggerProcesser<N extends keyof TriggersMap>(name: N,  fun: ( param?: TriggersMap[N]) => EventsMap[N] ): void{
        this.triggerProcess[<string>name] = <any>fun;
    };

    clearListener(){
        this.listeners = new Emiter();
    }
}