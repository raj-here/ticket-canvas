import { defineRequestType, RequestType } from "./helper.action";


export const GET_MY_TICKETS: RequestType = defineRequestType("@GET_MY_TICKETS");

export const getMyTickets = () => {

    return {
        types: [
            GET_MY_TICKETS.REQUEST,
            GET_MY_TICKETS.SUCCESS,
            GET_MY_TICKETS.FAILURE
        ],
        payload: {
            request: {
                url: `/ticket`,
                method: 'get'
            }
        }
    }
}