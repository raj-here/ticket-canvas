
import { AxiosError } from "axios";
import { combineReducers } from "redux";
import { GET_MY_TICKETS } from "../action";
import { authReducer } from './auth.reducer';

export interface InitialState {
    loading: boolean,
    error: boolean,
    data: any
};

const initialState: InitialState = {
    loading: false,
    error: false,
    data: null
};

const dogReducer = (state = initialState, action: any) => {
    const { type } = action;

    console.log(type)
    switch (type) {
        case GET_MY_TICKETS.REQUEST:
            return { ...state, loading: true, error: undefined }
        case GET_MY_TICKETS.FAILURE:
            return { ...state, loading: false, error: true }
        case GET_MY_TICKETS.SUCCESS:
            return { ...state, loading: false, data: action.payload.data.message }
        default:
            return state
    }
}

export const combineReducer = combineReducers({
    dogReducer,
    authReducer
})

export const getErrorFromPayload = (errorPayload: AxiosError): string => {
    return (errorPayload.response && errorPayload.response.data && errorPayload.response.data.message) || "Something Went Wrong";
}

export * from './auth.reducer';