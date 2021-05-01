import { csrfFetch } from "./csrf";

const LOAD_ALL = "event/LOAD-ALL";
const DELETE = "event/DELETE";
const ADD = "event/ADD";
const UPDATE = "event/UPDATE";

const loadAll = (list) => ({
  type: LOAD_ALL,
  events: list,
});

const addEvent = (event) => ({
  type: ADD,
  event,
});

//could be going by event id or event id, worry bout it later
const deleteEvent = (eventId) => ({
  type: DELETE,
  eventId,
});

// const updateEvent = (eventId) => ({
//   type: UPDATE,
//   eventId,
// });

export const loadAllEvents = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`);
  const events = await res.json();
  dispatch(loadAll(events));
  return events;
};

export const addOneEvent = (userId, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`, {
    method: "POST",
    body: JSON.stringify({ payload }),
  });
  const userEvent = await res.json();
  dispatch(addEvent(userEvent));
  return userEvent;
};

export const deleteOneEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
    body: JSON.stringify({ eventId }),
  });
  dispatch(deleteEvent(eventId));
};
const initialState = {
  userEvents: {},
};
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      let newState = { ...state };
      newState[action.event.id] = action.event;
      newState.userEvents[action.event.id] = action.event;
      return newState;
    }
    case LOAD_ALL: {
      let newState = { ...state };
      action.events.eventsList.forEach((event) => {
        newState[event.id] = event;
      });

      action.events.userEventsList.forEach((event) => {
        newState.userEvents[event.id] = event;
      });
      return newState;
    }
    case DELETE: {
      let newState = { ...state };
      delete newState.userEvents[action.eventId];
    }
    default:
      return state;
  }
};
export default eventsReducer;
