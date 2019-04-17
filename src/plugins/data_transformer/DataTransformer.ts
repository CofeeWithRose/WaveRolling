import {stringify} from 'qs'

export function DataTransformer(url: string, data: any, method: 'GET'|'POST'|'PUT'|'DELETE'){
    url = url || '';
    method = method || 'GET';
    if( 'GET' === method ){
        data = data instanceof FormData? null:  stringify(data);
        url = `${url}?${data}`;
        data = null;
    }else{
        data = data instanceof FormData? data :  JSON.stringify(data);
    }
    return { 
        url, 
        fetchOptions: { body: data, method } 
    };
}