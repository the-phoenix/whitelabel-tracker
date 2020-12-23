import React, { useState, useEffect } from "react";
import { WhiteLabelTag } from "../../stores/tags";

import "./styles.css";

interface SingleTagsProps extends WhiteLabelTag {
  onDelete: (tagName: string) => void;
  onRefresh: (tagName: string) => void;
}

const SingleTag: React.FC<SingleTagsProps> = (props) => {
  useEffect(() => {
    if (!props.occurence) {
      props.onRefresh(props.tagName);
    }
  }, []);

  return (
    <div className="single-tag mx-2 my-2">
      <div className="mr-2">{props.tagName}</div>
      <div className="mr-2">{props.description}</div>
      <div className="mr-2">{props.occurence}</div>
      <div>
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => props.onDelete(props.tagName)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTag;
