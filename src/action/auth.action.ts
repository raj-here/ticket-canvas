import { defineRequestType, RequestType } from "./helper.action";

export const AUTH_REQUEST: RequestType = defineRequestType("@AUTH_REQUEST");

export const authRequest = (authData: any) => { 
    return {
        types: [
            AUTH_REQUEST.REQUEST,
            AUTH_REQUEST.SUCCESS,
            AUTH_REQUEST.FAILURE
        ],
        payload: {
            request: {
                url: `/home/auth`,
                method: 'post',
                data: authData,
            }
        }
    }
}

export const saveLoginDetail = (token: string) => {
    if (token) {
        localStorage.setItem('token', token);
    }
}