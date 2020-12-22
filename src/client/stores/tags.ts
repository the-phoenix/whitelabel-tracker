import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface WhiteLabelTagPayload {
  name: string;
  description: string;
}

export interface WhiteLabelTag extends WhiteLabelTagPayload {
  occurence: string;  // Load via api
  loading: boolean;
  error: null | Error;
}

export interface TagsState {
  tags: { [tagName: string]: WhiteLabelTag; }
}

const initialState: TagsState = {
  tags: {}
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
      // Redux toolkit allows
      state.tags[action.payload.name] = {
        ...action.payload,
        error: null,
        occurence: '',
        loading: false,
      };
    },
  },
});