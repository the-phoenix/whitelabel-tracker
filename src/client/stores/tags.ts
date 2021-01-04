import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "immer";
import { AppThunk, RootState } from "./index";
import { WL_TAG_PREFIX } from "../../core/constants";

export type TagName = string;

export interface WhiteLabelTagPayload {
  tagName: TagName;
  description: string;
}

export interface WhiteLabelTagUpdatePayload extends WhiteLabelTagPayload {
  index: number;
}

export interface WhiteLabelTag extends WhiteLabelTagPayload {
  occurence: string; // Load via api
  loading: boolean;
  err: null | Error;
}

export interface TagsState {
  tags: WhiteLabelTag[];
}

const initialState: TagsState = {
  tags: [
    {
      tagName: "favicon",
      description: "some goes here",
      occurence: "howdy",
      loading: false,
      err: null,
    },
  ],
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based on those changes
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addNewTag: (state, { payload }: PayloadAction<WhiteLabelTagPayload>) => {
      state.tags.push({
        ...payload,
        err: null,
        occurence: "",
        loading: false,
      });
    },
    deleteTag: (state, { payload }: PayloadAction<TagName>) => {
      const index = state.tags.findIndex((t) => t.tagName === payload);
      if (index < 0) return;

      state.tags.splice(index, 1);
    },
    updateTag: (
      state,
      { payload }: PayloadAction<WhiteLabelTagUpdatePayload>
    ) => {
      const index = payload.index;
      if (!state.tags[index]) return;

      state.tags[index] = {
        ...state.tags[index],
        ...payload,
        occurence: "",
      };
    },
    queryOccurenceLoading: (state, { payload }: PayloadAction<TagName>) => {
      const index = state.tags.findIndex((t) => t.tagName === payload);
      if (index < 0) return;

      state.tags[index].loading = true;
    },
    queryOccurenceSuccess: (
      state,
      { payload }: PayloadAction<{ tagName: TagName; occurence: string }>
    ) => {
      const index = state.tags.findIndex((t) => t.tagName === payload.tagName);
      if (index < 0) return;

      state.tags[index].loading = false;
      state.tags[index].occurence = payload.occurence;
      state.tags[index].err = null;
    },
    queryOccurenceError: (
      state,
      { payload }: PayloadAction<{ tagName: TagName; error: Error }>
    ) => {
      const index = state.tags.findIndex((t) => t.tagName === payload.tagName);
      if (index < 0) return;

      state.tags[index].loading = false;
      state.tags[index].occurence = "";
      state.tags[index].err = payload.error;
    },
  },
});

export const { addNewTag, deleteTag, updateTag } = tagsSlice.actions;

export const queryOccurence = (tagName: TagName): AppThunk => async (
  dispatch
) => {
  dispatch(tagsSlice.actions.queryOccurenceLoading(tagName));

  try {
    const fullTagName = `${WL_TAG_PREFIX}${tagName}`;
    const resp = await fetch("/api/occurence?tagName=" + fullTagName);
    const occurence = await resp.text();

    dispatch(tagsSlice.actions.queryOccurenceSuccess({ tagName, occurence }));
  } catch (error) {
    dispatch(tagsSlice.actions.queryOccurenceError({ tagName, error }));
  }
};

export const selectTags = (state: RootState) => state.tags.tags;

export default tagsSlice.reducer;
