import 'isomorphic-fetch';

export async function fetchCallAsync(url: string, method: string, headers: any, request: any){
    const result = await fetch(url, getFetchOptions(method, headers, request));

    if (result.ok === false){
        throw new Error(`Server call failed. Code ${result.status}`)
    }
    return result;
}

export function fetchCall(url: string, method: string, headers: any, request: any){
    return fetch(url, getFetchOptions(method, headers, request));
}

function getFetchOptions(method: string, headers: any, request: any): RequestInit{
    return{
        method : method,
        body: request ? JSON.stringify(request) : null,
        headers: headers,
        cache: 'no-cache',
        credentials: 'same-origin'
    }
}