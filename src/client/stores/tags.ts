import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { current } from 'immer';
import { AppThunk, RootState } from './index';

type TagName = string;

export interface WhiteLabelTagPayload {
  tagName: TagName;
  description: string;
};

export interface WhiteLabelTag extends WhiteLabelTagPayload {
  occurence: string;  // Load via api
  loading: boolean;
  err: null | Error;
};

export interface TagsState {
  tags: { [tagName: string]: WhiteLabelTag }
};

const initialState: TagsState = {
  tags: {
    '__WT-favicon': {
      tagName: '__WT-favicon',
      description: 'some goes here',
      occurence: '',
      loading: false,
      err: null
    }
  }
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based on those changes
export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<WhiteLabelTagPayload>) => {
      const { payload } = action;

      state.tags[payload.tagName] = {
        ...payload,
        err: null,
        occurence: '',
        loading: false,
      };
    },
    queryOccurenceLoading: (state, action: PayloadAction<TagName>) => {
      state.tags[action.payload].loading = true;
    },
    queryOccurenceSuccess: (state, action: PayloadAction<{tagName: TagName, occurence: string}>) => {
      const { payload } = action;

      state.tags[payload.tagName].loading = false;
      state.tags[payload.tagName].occurence = payload.occurence;
    },
    queryOccurenceError: (state, action: PayloadAction<{tagName: TagName, error: Error}>) => {
      const { payload } = action;

      state.tags[payload.tagName].loading = false;
      state.tags[payload.tagName].err = payload.error;
    }
  },
});

export const { ...actions } = tagsSlice.actions;

export const queryOccurence = (tagName: TagName): AppThunk => async dispatch => {
  dispatch(actions.queryOccurenceLoading(tagName))

  try {
    const resp = await fetch("/api/occurence?tagName=" + tagName);
    const occurence = await resp.text();

    dispatch(actions.queryOccurenceSuccess({ tagName, occurence }));
  } catch (error) {
    dispatch(actions.queryOccurenceError({ tagName, error }));
  }
};

export const selectTags = (state: RootState) => state.tags.tags

export default tagsSlice.reducer