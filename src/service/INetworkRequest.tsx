import axios, { Method } from "axios";

export default interface INetworkRequest {
    httpMethod: Method
    params: {}
}