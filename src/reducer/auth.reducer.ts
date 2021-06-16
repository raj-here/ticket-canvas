import { getErrorFromPayload } from ".";
import { AUTH_REQUEST } from "../action";

export interface AuthState {
    loading: boolean,
    error: string,
    token: any
};

const initialState: AuthState = {
    loading: true,
    error: '',
    token: null
};

export const authReducer = (state = initialState, action: any) => {
    const { type } = action;
    switch (type) {
        case AUTH_REQUEST.REQUEST:
            return { ...state, loading: true, error: undefined }
        case AUTH_REQUEST.FAILURE: 
            return { ...state, loading: false, error: getErrorFromPayload(action.error) }
        case AUTH_REQUEST.SUCCESS: 
            return { ...state, loading: false, data: action.payload.data.message }
        default:
            return state
    }
}