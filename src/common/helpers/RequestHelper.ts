import axios, {AxiosResponse, Method} from "axios";
import StorageService from "./StorageService";
import HttpStatusCode from "../constants/HttpErrorCode";
import {navigatorUtils} from "./NavigatorUtils";

const API_URL = process.env.REACT_APP_API_URL;

export interface IApiResponse {
    readonly status: number;
    readonly body: any;
}

export interface IBodyError {
    readonly errorCode: number;
    readonly message: string
}

export async function getFileDownload(path: string, params = {}) {
    let newHeaders: any = {'Content-Type': 'application/json'};
    if (StorageService.isTokenExits()) {
        newHeaders['Authorization'] = "Bearer " + StorageService.getToken();
    }
    return await axios.get(API_URL + path, {
        params,
        headers: newHeaders,
        responseType: "blob"
    }).then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "vehicles.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
    })
}

export async function getRequest(path: string, params: object = {}): Promise<IApiResponse> {
    let newHeaders: any = {'Content-Type': 'application/json'};
    if (StorageService.isTokenExits()) {
        newHeaders['Authorization'] = "Bearer " + StorageService.getToken();
    }

    return await axios.get(API_URL + path, {params, headers: newHeaders})
        .then(
            (response: AxiosResponse) => {
                const apiResponse: IApiResponse = {
                    status: response.status,
                    body: response.data // humps.camelizeKeys(response.data),
                };
                return apiResponse;
            },
            (error) => {
                if (error.response.status == HttpStatusCode.UNAUTHORIZED) {
                    StorageService.removeToken();
                    navigatorUtils.redirect("/")
                }

                const apiResponse: IApiResponse = {
                    status: error.response.status,
                    body: ""
                };
                return apiResponse;
            })
        .catch((error) => {
            if (!error.response) {
                let bodyError: IBodyError = {
                    errorCode: 500,
                    message: "Network Error"
                };

                const apiResponse: IApiResponse = {
                    status: 500,
                    body: bodyError
                };
                return apiResponse;
            } else {
                let bodyError: IBodyError = {
                    errorCode: error.response.data.errorCode,
                    message: error.response.data.message
                };

                const apiResponse: IApiResponse = {
                    status: error.response.status,
                    body: bodyError
                };
                return apiResponse;
            }
        });
}

export async function postRequest(path: string, params: object = {}): Promise<IApiResponse> {
    return apiCall(path, "POST", params);
}

export async function putRequest(path: string, params: object = {}): Promise<IApiResponse> {
    return apiCall(path, "PUT", params);
}

export async function deleteRequest(path: string, params: object = {}): Promise<IApiResponse> {
    return apiCall(path, "DELETE", params);
}

export async function apiFileRequest(path: string, formData: any) {
    let newHeaders: any = {};
    // let formData = new FormData();
    // formData.append("file", file);
    if (StorageService.isTokenExits()) {
        newHeaders['Authorization'] = "Bearer " + StorageService.getToken();
    }
    return new Promise<IApiResponse>((resolve) => {
        axios({
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...newHeaders
            },
            method: 'POST',
            url: API_URL + path
        }).then(response => {
            resolve({
                status: response.status,
                body: response.data //humps.camelizeKeys(response.data),
            });
        }).catch(error => {

            if (!error.response) {
                let bodyError: IBodyError = {
                    errorCode: 500,
                    message: "Network Error"
                };

                const apiResponse: IApiResponse = {
                    status: 500,
                    body: bodyError
                };
                resolve(apiResponse);
            } else {
                let bodyError: IBodyError = {
                    errorCode: error.response.data.errorCode,
                    message: error.response.data.message
                };

                const apiResponse: IApiResponse = {
                    status: error.response.status,
                    body: bodyError
                };
                resolve(apiResponse);
            }
        });
    });

}

export function apiCall(path: string, _method: Method = "POST", _params: object, headers = {}): Promise<IApiResponse> {

    let newHeaders: any = {'Content-Type': 'application/json'};
    if (StorageService.isTokenExits()) {
        newHeaders['Authorization'] = "Bearer " + StorageService.getToken();
    }

    return new Promise<IApiResponse>((resolve) => {
        axios({
            data: JSON.stringify(_params),
            headers: {
                ...newHeaders,
                ...headers
            },
            method: _method,
            url: API_URL + path
        })
            .then(response => {
                resolve({
                    status: response.status,
                    body: response.data //humps.camelizeKeys(response.data),
                });
            })
            .catch(error => {

                if (!error.response) {
                    let bodyError: IBodyError = {
                        errorCode: 500,
                        message: "Network Error"
                    };

                    const apiResponse: IApiResponse = {
                        status: 500,
                        body: bodyError
                    };
                    resolve(apiResponse);
                } else {
                    let bodyError: IBodyError = {
                        errorCode: error.response.data.errorCode,
                        message: error.response.data.message
                    };

                    const apiResponse: IApiResponse = {
                        status: error.response.status,
                        body: bodyError
                    };
                    resolve(apiResponse);
                }
            });

    });
}
