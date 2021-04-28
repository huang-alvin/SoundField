import { csrfFetch } from "./csrf";

const LOAD_ALL = "event/LOAD-ALL";
const DELETE = "event/DELETE";
const ADD = "event/ADD";
const LOAD = "event/LOAD";

const loadAll = (list) => ({
  type: LOAD_ALL,
  eventList: list,
});
const load = (list) => ({
  type: LOAD,
  userEventList: list,
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

export const loadAllEvents = () => async (dispatch) => {
  console.log("event store");
  const res = await csrfFetch(`/api/events/`);
  const eventList = await res.json();
  dispatch(loadAll(eventList));
  return eventList;
};
export const loadUserEvents = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`);
  const eventList = await res.json();
  dispatch(load(eventList));
  return eventList;
};
export const addOneEvent = (userId, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`, {
    method: "POST",
    body: JSON.stringify({ eventId }),
  });
  const result = await res.json();
  dispatch(addEvent(eventId));
  return result;
};

const initialState = {};
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        [action.event.id]: action.event,
      };
    case LOAD_ALL: {
      let newState = { ...state };
      action.eventList.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    }
    default:
      return state;
  }
};
export default eventsReducer;
