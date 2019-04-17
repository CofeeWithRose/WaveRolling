export declare function DataTransformer(url: string, data: any, method: "GET" | "PUT" | "DELETE" | "POST"): {
    url: string;
    fetchOptions: {
        body: any;
    };
};
