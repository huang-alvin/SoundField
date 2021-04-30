import { csrfFetch } from "./csrf";

const LOAD_ALL = "event/LOAD-ALL";
const DELETE = "event/DELETE";
const ADD = "event/ADD";
const LOAD = "event/LOAD";

// in the load send back all events and also only user events
const loadAll = (list) => ({
  type: LOAD_ALL,
  events: list,
});
// const load = (list) => ({
//   type: LOAD,
//   userEventList: list,
// });

const addEvent = (event) => ({
  type: ADD,
  event,
});

//could be going by event id or event id, worry bout it later
const deleteEvent = (eventId) => ({
  type: DELETE,
  eventId,
});

export const loadAllEvents = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`);
  const events = await res.json();
  dispatch(loadAll(events));
  return events;
};
// export const loadUserEvents = (userId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/events/${userId}`);
//   const eventList = await res.json();
//   dispatch(load(eventList));
//   return eventList;
// };
export const addOneEvent = (userId, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${userId}`, {
    method: "POST",
    body: JSON.stringify({ eventId }),
  });
  const result = await res.json();
  dispatch(addEvent(eventId));
  return result;
};

const initialState = {
  userEvents: {},
};
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD: {
    //   return {
    //     ...state,
    //     [action.event.id]: action.event,
    //   };
    // }
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
    // case DELETE: {
    //   let newState = { ...state };
    // }
    default:
      return state;
  }
};
export default eventsReducer;
