
export interface EventMap {
    
    [index: string]: Array<(...params: Array<any>) => void>
}

export interface IEmiter{

    addListener(name: string, fun: (...params: Array<any>) => void): void;

    removeListener(name: string, fun: (...params: Array<any>) => void): void;

    emit(name: string, ...params: Array<any>): void;
}