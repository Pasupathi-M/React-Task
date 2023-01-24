import axios from "axios";
import { API_ENDPOINT } from '../environment/environment.dev'

const REST_METHODS: string[] = ['get', 'post', 'put', 'delete', 'patch']


export const getApi = (url: string, params?: string, query?:string): Promise<any> => {

    const requestObject = {
        baseURL: API_ENDPOINT,
        method: REST_METHODS[0],
        url
    } as Record<string, any>

    if(params) requestObject.params = params
    return axios(requestObject)
} 

export const createApi = (url: string, data: Record<any, any>, params?: string, query?: string): Promise<any> => {

    const requestObject = {
        baseURL: API_ENDPOINT,
        method: REST_METHODS[1],
        url,
        data
    } as Record<string, any>

    if(params) requestObject.params = params

    return axios({ ...requestObject })
}

export const updateApi = (url: string, data: Record<any, any>, params?: string | any,  query?:string): Promise<any> => {

    const requestObject = {
        baseURL: API_ENDPOINT,
        method: REST_METHODS[2],
        url,
        data
    } as Record<string, any>

    if(params) requestObject.params = params

    return axios({ ...requestObject })

}

export const deleteApi = (url: string, params?: Record<string, any>, data?: Record<string, any>, query?:string): Promise<any> => {

    const requestObject = {
        baseURL: API_ENDPOINT,
        method: REST_METHODS[3],
        url,
        data
    } as Record<string, any>

    if(params) requestObject.params = params

    return axios({ ...requestObject })

}