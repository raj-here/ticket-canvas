import { defineRequestType, RequestType } from "./helper.action";


export const GET_TICKETS: RequestType = defineRequestType("@GET_TICKETS");
export const GET_TICKET: RequestType = defineRequestType("@GET_TICKET");
export const NEW_TICKET: RequestType = defineRequestType("@NEW_TICKET");
export const DELETE_TICKET: RequestType = defineRequestType("@DELETE_TICKET");

export const getTickets = () => {
    return {
        types: [
            GET_TICKETS.REQUEST,
            GET_TICKETS.SUCCESS,
            GET_TICKETS.FAILURE
        ],
        payload: {
            request: {
                url: `/ticket`,
                method: 'get'
            }
        }
    }
}

export const getTicket = (ticketId: string) => {
    return {
        types: [
            GET_TICKET.REQUEST,
            GET_TICKET.SUCCESS,
            GET_TICKET.FAILURE
        ],
        payload: {
            request: {
                url: `/ticket/${ticketId}`,
                method: 'get'
            }
        }
    }
}

export const deleteTicket = (ticketId: string) => {
    return {
        types: [
            DELETE_TICKET.REQUEST,
            DELETE_TICKET.SUCCESS,
            DELETE_TICKET.FAILURE
        ],
        payload: {
            request: {
                url: `/ticket/${ticketId}`,
                method: 'delete'
            }
        }
    }
}

export const newTicket = (ticketData: any) => {
    return {
        types: [
            NEW_TICKET.REQUEST,
            NEW_TICKET.SUCCESS,
            NEW_TICKET.FAILURE
        ],
        payload: {
            request: {
                url: `/ticket`,
                method: 'post',
                data: ticketData
            }
        }
    }
}