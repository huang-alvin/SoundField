import { csrfFetch } from "./csrf";

const LOAD = "bookmark/LOAD";
const DELETE = "bookmark/DELETE";
const ADD = "bookmark/ADD";

const load = (list) => ({
  type: LOAD,
  bookmarkList: list,
});

const addBookmark = (bookmark) => ({
  type: ADD,
  bookmark,
});

//could be going by bookmark id or event id, worry bout it later
const deleteBookmark = (bookmarkId) => ({
  type: DELETE,
  bookmarkId,
});
export const loadBookmarks = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookmarks/${userId}`);
  const bookmarkList = await res.json();
  dispatch(load(bookmarkList));
  return bookmarkList;
};
export const addOneBookmark = (userId, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookmarks/${userId}`, {
    method: "POST",
    body: JSON.stringify({ eventId }),
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
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        [action.bookmark.id]: action.bookmark,
      };
    }
    case DELETE: {
      const newState = { ...state };
      delete newState[action.bookmarkId];
      return newState;
    }
    case LOAD: {
      let newState = { ...state };
      action.bookmarkList.forEach((bookmark) => {
        newState[bookmark.id] = bookmark;
      });
      return newState;
    }
    default:
      return state;
  }
};
export default bookmarksReducer;
