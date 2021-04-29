import { csrfFetch } from "./csrf";

const LOAD = "ticket/LOAD";
const DELETE = "ticket/DELETE";
const ADD = "ticket/ADD";

const load = (list) => ({
  type: LOAD,
  ticketList: list,
});

const addTicket = (ticket) => ({
  type: ADD,
  ticket,
});

const deleteTicket = (ticketId) => ({
  type: DELETE,
  ticketId,
});

export const loadTickets = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets/${userId}`);
  const ticketList = await res.json();
  dispatch(load(ticketList));
  return ticketList;
};

export const addOneTicket = (userId, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets/${userId}`, {
    method: "POST",
    body: JSON.stringify({ eventId }),
  });
  const ticket = await res.json();
  dispatch(addTicket(ticket));
  return ticket;
};

// this thunk is for future implementation
export const deleteOneTicket = (ticketObj) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets/${ticketObj.id}`);
  dispatch(deleteTicket(ticketObj.id));
  const result = await res.json();
  return result;
};

//Did not add delete because Users should not be able to delete ticket
// tickets only delete when the event itself is deleted
// let expired tickets show in the user's ticket page
const initialState = {};
const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        [action.ticket.id]: action.ticket,
      };
    }
    case LOAD: {
      let newState = { ...state };
      action.ticketList.forEach((ticket) => {
        newState[ticket.id] = ticket;
      });
      return newState;
    }
    default:
      return state;
  }
};
export default ticketsReducer;
