import axios from "axios";
import { API_ENDPOINT } from '../environment/environment.dev'

import * as LocalStorage from "../common-services/localstorage"
import { url } from "inspector";

const REST_METHODS: string[] = ['get', 'post', 'put', 'delete', 'patch']


export const getApi = (url: string, params?: string, query?:string): Promise<any> => {

    // const requestObject = {
    //     baseURL: API_ENDPOINT,
    //     method: REST_METHODS[0],
    //     url
    // } as Record<string, any>

    const URL = `${API_ENDPOINT}${url}`
    // if(params) requestObject.params = params
    return axios.get(URL, {
        headers: {
            'access-token': LocalStorage.retrieve('access-token')
        }
    })
} 

export const createApi = (url: string, data: Record<any, any>, params?: string, query?: string): Promise<any> => {

    // if(params) requestObject.params = params
    const URL = `${API_ENDPOINT}${url}` 

    return axios.post(URL, { ...data }, {
        headers: {
            'access-token': LocalStorage.retrieve('access-token')
        }
    })
}

export const updateApi = (url: string, data: Record<any, any>, params?: string | any,  query?:string): Promise<any> => {

    const URL = `${API_ENDPOINT}${url}`
    // if(params) requestObject.params = params

    return axios.put(URL, { ...data }, {
        headers: {
            'access-token': LocalStorage.retrieve('access-token')
        }
    })

}

export const deleteApi = (url: string, params?: Record<string, any>, data?: Record<string, any>, query?:string): Promise<any> => {

    const URL = `${API_ENDPOINT}${url}`
    // if(params) requestObject.params = params

    return axios.delete(URL, {
        headers: {
            'access-token': LocalStorage.retrieve('access-token')
        }
    })

}

export const signUpAndSignIn = (url: string, data: Record<string, any>) => {
    const URL = `${API_ENDPOINT}${url}`

    return axios.post(URL, { ...data})
}