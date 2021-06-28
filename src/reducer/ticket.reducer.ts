import { DELETE_TICKET, GET_TICKET, GET_TICKETS, NEW_TICKET } from "../action";

interface TicketDto {
    id: number;
    ticketSubject: string,
    createdBy: string,
    dateCreated: string
}

interface Ticket {
    id: number;
    ticketSubject: string;
    type: string;
    description: string;
    link: string;
    createdBy: string;
    workedBy: string;
    dateCreated: string;
    lastUpdated: string;
}

export interface TicketState {
    loading: boolean,
    error: boolean,
    list: TicketDto[],
    data: Ticket,
    status: 'Success' | 'Error' | 'Delete'
};

const initialState: TicketState = {
    loading: false,
    error: false,
    list: [],
    data: null!,
    status: 'Error'
};

export const ticketReducer = (state = initialState, action: any) => {
    const { type } = action;
    switch (type) {
        case GET_TICKETS.REQUEST:
        case GET_TICKET.REQUEST:
        case NEW_TICKET.REQUEST:
        case DELETE_TICKET.REQUEST:
            return { ...state, loading: true, error: undefined }
        case GET_TICKETS.FAILURE:
        case GET_TICKET.FAILURE:
        case NEW_TICKET.FAILURE:
        case DELETE_TICKET.FAILURE:
            return { ...state, loading: false, error: true }
        case GET_TICKETS.SUCCESS:
            return { ...state, loading: false, list: action.payload.data.data }
        case GET_TICKET.SUCCESS:
            return { ...state, loading: false, data: action.payload.data }
        case NEW_TICKET.SUCCESS:
            return { ...state, loading: false, status: 'Success' }
        case DELETE_TICKET.SUCCESS:
            return { ...state, loading: false, status: 'Delete' }
        default:
            return state
    }
}