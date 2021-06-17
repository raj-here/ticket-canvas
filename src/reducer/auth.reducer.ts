import { getErrorFromPayload } from ".";
import { AUTH_REQUEST, USER_REGISTER } from "../action";

export interface AuthState {
    loading: boolean;
    error: string;
    token: any;
    status: 'Success' | 'Error'
};

const initialState: AuthState = {
    loading: false,
    error: '',
    token: null,
    status: 'Error'
};

export const authReducer = (state = initialState, action: any) => {
    const { type } = action; 
    switch (type) {
        case AUTH_REQUEST.REQUEST:
        case USER_REGISTER.REQUEST:
            return { ...state, loading: true, error: undefined }
        case AUTH_REQUEST.FAILURE:
        case USER_REGISTER.FAILURE:
            return { ...state, loading: false, error: getErrorFromPayload(action.error) }
        case AUTH_REQUEST.SUCCESS:
            return { ...state, loading: false, token: action.payload.data.token }
        case USER_REGISTER.SUCCESS:
            return { ...state, loading: false, status: 'Success' }
        default:
            return state
    }
}