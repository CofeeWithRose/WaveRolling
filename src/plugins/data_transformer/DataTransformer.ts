function stringify ( data?: {} ){
    let result = '';
    if(data instanceof Array){
        result = strfyArray(data, result, '');
    }else if( data instanceof Object  ){
        result = strfyObject(data, result, '');
    }
    return result;
}

function strfyArray(data: Array<any>, curStr: string, prefix: string){
    data.forEach( (item, index) => {
        const curPrefix = prefix? `${prefix}[${index}]`:`${index}`;
        if(item instanceof Array){
            curStr = strfyArray( item, curStr, curPrefix);
        }else if( item instanceof Object ){
            curStr = strfyObject(item, curStr, curPrefix);
        }else{
            curStr+= curStr? `&${curPrefix}=${item}`: `${curPrefix}=${item}`;
        }
    })
    return curStr;
}

function strfyObject(data: any, curStr: string, prefix: string){
    for(const key in data){
        const item = data[key];
        const curPrefix = prefix? `${prefix}[${key}]`:`${key}`;
        if(item instanceof Array){
            curStr = strfyArray( item, curStr, curPrefix);
        }else if( item instanceof Object ){
            curStr = strfyObject(item, curStr, curPrefix);
        }else{
            curStr+= curStr? `&${curPrefix}=${item}`: `${curPrefix}=${item}`;
        }
    }
    return curStr;
};
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