import qs from 'qs'


export function DataTransformer(url, data, method){
    url = url || '';
    if( !method ||'GET' === method ){
        data = data instanceof FormData? null:  qs.stringify(data);
        url = `${url}?${data}`;
        data = null;
    }
    const body = data;
    return { url, body, method };
}