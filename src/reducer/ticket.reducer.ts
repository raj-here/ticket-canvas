import { GET_TICKETS } from "../action";

interface Ticket {
    ticketSubject: string,
    createdBy: string,
    dateCreated: string
}

export interface TicketState {
    loading: boolean,
    error: boolean,
    data: Ticket[]
};

const initialState: TicketState = {
    loading: false,
    error: false,
    data: []
};

export const ticketReducer = (state = initialState, action: any) => {
    const { type } = action;
    switch (type) {
        case GET_TICKETS.REQUEST:
            return { ...state, loading: true, error: undefined }
        case GET_TICKETS.FAILURE:
            return { ...state, loading: false, error: true }
        case GET_TICKETS.SUCCESS:
            debugger
            return { ...state, loading: false, data: action.payload.data.data }
        default:
            return state
    }
}