import {stringify} from 'qs'

export function DataTransformer(url, data, method){
    url = url || '';
    if( !method ||'GET' === method ){
        data = data instanceof FormData? null:  stringify(data);
        url = `${url}?${data}`;
        data = null;
    }else{
        data = data instanceof FormData? data :  JSON.stringify(data);
    }
    return { 
        url, 
        fetchOptions: { body: data } 
    };
}