import { AxiosError } from "axios";
import { combineReducers } from "redux";
import { reducer as form, FormStateMap } from 'redux-form';

import { authReducer } from './auth.reducer';
import { ticketReducer } from './ticket.reducer';

export interface ApplicationState {
    ticketReducer: any;
    authReducer: any;
    form: FormStateMap;
}


export const rootReducer = combineReducers<ApplicationState>({
    ticketReducer,
    authReducer,
    form
})

export const getErrorFromPayload = (errorPayload: AxiosError): string => {
    return (errorPayload.response && errorPayload.response.data && errorPayload.response.data.message) || "Something Went Wrong";
}

export * from './auth.reducer';
export * from './ticket.reducer';