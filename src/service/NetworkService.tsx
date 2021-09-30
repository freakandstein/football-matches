import axios, { AxiosResponse } from "axios"
import INetworkRequest from './INetworkRequest'
import IResponse from '../model/IResponse'

export interface INetworkService {
    request: ( url: string, networkRequest: INetworkRequest) => Promise<AxiosResponse<IResponse>>
}

export default class NetworkService implements INetworkService {
    static instance: INetworkService = new NetworkService()
    request = (url: string, networkRequest: INetworkRequest): Promise<AxiosResponse<IResponse>>  => { 
        return axios.request<IResponse>({method: networkRequest.httpMethod, baseURL: url, params: networkRequest.params})
    }
}