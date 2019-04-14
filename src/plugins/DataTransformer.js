"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = require("qs");
function DataTransformer(url, data, method) {
    url = url || '';
    method = method || 'GET';
    if ('GET' === method) {
        data = data instanceof FormData ? null : qs_1.stringify(data);
        url = url + "?" + data;
        data = null;
    }
    else {
        data = data instanceof FormData ? data : JSON.stringify(data);
    }
    return {
        url: url,
        // fetchOptions: { body: data } 
        fetchOptions: {}
    };
}
exports.DataTransformer = DataTransformer;
//# sourceMappingURL=DataTransformer.js.map