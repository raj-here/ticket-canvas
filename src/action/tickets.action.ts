import { defineRequestType, RequestType } from "./helper.action";


export const GET_TICKETS: RequestType = defineRequestType("@GET_TICKETS");

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