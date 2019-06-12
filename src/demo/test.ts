
fetch('/source/test.wav').then( (val: Response) => {
    if(val.body){
        // 从Response中获取可读流的reader，用于从管道中读取数据。
        const reader: ReadableStreamReader =  val.body.getReader();
        readData(reader);
    }
})

function readData(reader: ReadableStreamReader){
    // 从管道中读取数据。
    reader.read().then(data => {

        if(!data.done){
            // data.value 为一个Uint8Array.
            console.log(data.value.byteLength);
            // 若还有数据，继续读取。
            readData(reader);
        }
    })    
};

// const xhr  = new XMLHttpRequest();
// xhr.responseType = 'arraybuffer'; 
// xhr.onprogress = data => {
//     console.log( 'data: ',data );
//     console.log('onprogress response: ', xhr.response && xhr.response.byteLength);
// }
// xhr.onloadend = data => {
//     console.log('load end..');
// }
// xhr.open('get','/source/test.wav' );
// xhr.send();

export {}