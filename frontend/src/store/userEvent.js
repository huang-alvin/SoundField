const DELETE = "event/DELETE";
const ADD = "event/ADD";
const LOAD = "event/LOAD";

const addEvent = (event) => ({
  type: ADD,
  event,
});
const load = (list) => ({
  type: LOAD,
  userEventList: list,
});

const deleteEvent = (eventId) => ({
  type: DELETE,
  eventId,
});

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
