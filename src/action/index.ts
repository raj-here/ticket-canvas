import { defineRequestType, RequestType } from "./helper.action";

export const GET_REQUEST: RequestType = defineRequestType("@GET_REQUEST");

export const getRequest = () => {

    return {
        types: [
            GET_REQUEST.REQUEST,
            GET_REQUEST.SUCCESS,
            GET_REQUEST.FAILURE
        ],
        payload: {
            request: {
                url: `/breeds/image/random`,
                method: 'get'
            }
        }
    }
}


export * from './auth.action';