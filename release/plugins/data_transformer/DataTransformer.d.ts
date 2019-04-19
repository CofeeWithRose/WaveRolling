export declare function DataTransformer(url: string, data: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): {
    url: string;
    fetchOptions: {
        body: any;
        method: "GET" | "PUT" | "DELETE" | "POST";
    };
};
