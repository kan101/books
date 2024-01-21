export interface AxiosErrorObject {
    message: string;
    name: string;
    stack: string;
    config: AxiosRequestConfig;
    code: string;
    status: null | number;
}

export interface AxiosRequestConfig {
    transitional: TransitionalConfig;
    adapter: string;
    transformRequest: Array<null | ((data: any) => any)>;
    transformResponse: Array<null | ((data: any) => any)>;
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, unknown>;
    headers: Record<string, string>;
    method: string;
    url: string;
}

export interface TransitionalConfig {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}
