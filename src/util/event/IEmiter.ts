
export interface EventMap {
    
    [index: string]: Array<(...params: Array<any>) => void>

}

export interface IEmiter{

    addListener(name: string|number, fun: (...params: Array<any>) => void): void;

    removeListener(name: string|number, fun: (...params: Array<any>) => void): void;

    emit(name: string|number, ...params: Array<any>): void;
    
}