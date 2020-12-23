import React, { useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleTag from "../../components/SingleTag";

import "./Tags.css";
import { selectCount } from "../../stores/counter";
import {
  selectTags,
  WhiteLabelTagPayload,
  addNewTag,
  deleteTag,
  queryOccurence,
} from "../../stores/tags";
import e from "express";

export default function Home() {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState("");
  const count = useSelector(selectCount);
  const tags = useSelector(selectTags);

  const handleAddNew = (event: FormEvent<HTMLFormElement>) => {
    if (!tagName.startsWith("__WT-")) {
      alert("TagName should start with __WT-");

      return false;
    }

    const payload: WhiteLabelTagPayload = {
      tagName,
      description: "random string goes here",
    };

    dispatch(addNewTag(payload));
    setTagName("");

    return false;
  };

  const handleDelete = (tagName: string) => dispatch(deleteTag(tagName));

  const handleRefresh = (tagName: string) => dispatch(queryOccurence(tagName));

  return (
    <div className="tags">
      <div className="tags-new">
        <form onSubmit={handleAddNew}>
          <div>
            <input
              type="text"
              className="my-3"
              style={{ border: "1px solid black" }}
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </div>
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      <div className="tags-list">
        {Object.values(tags).map((tag) => (
          <SingleTag
            key={tag.tagName}
            {...tag}
            onDelete={handleDelete}
            onRefresh={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
}
