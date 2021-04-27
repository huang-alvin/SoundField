import { csrfFetch } from "./csrf";

const LOAD = "bookmark/LOAD";
const DELETE = "bookmark/DELETE";
const ADD = "bookmark/ADD";

const load = (list) => ({
  type: LOAD,
  list,
});

const addBookmark = (bookmarkObj) => ({
  type: ADD,
  bookmark: bookmarkObj,
});

//could be going by bookmark id or event id, worry bout it later
const deleteBookmark = (bookmarkId) => ({
  type: DELETE,
  bookmarkId,
});
export const loadBookmarks = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookmarks");
  const bookmarkList = await res.json();
  dispatch(load(bookmarkList));
  return bookmarkList;
};
export const addOneBookmark = (userId, eventId) => async (dispatch) => {
  const res = await csrfFetch("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify({ userId, eventId }),
  });
  const result = await res.json();
  dispatch(addBookmark(eventId));
  return result;
};
export const deleteOneBookmark = (bookmarkObj) => async (dispatch) => {
  // const {userId, eventId} = bookmarkObj;
  const res = await csrfFetch(`/api/bookmarks/${bookmarkObj.id}`, {
    method: "DELETE",
    body: JSON.stringify({ bookmarkObj }),
  });
  const result = await res.json();
  dispatch(deleteBookmark(bookmarkObj.id));
  return result;
};

const initialState = {};
const bookmarksReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        [action.bookmarkId]: action.bookmark,
      };
    }
    case DELETE: {
    }
  }
};

export const loadBookmarks = list;
