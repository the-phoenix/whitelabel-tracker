import React, { useState, useEffect } from "react";
import { WhiteLabelTag } from "../../stores/tags";

import "./styles.css";

interface SingleTagsProps extends WhiteLabelTag {
  index: number;
  onDelete: (tagName: string) => void;
  onRefresh: (tagName: string) => void;
}

const SingleTag: React.FC<SingleTagsProps> = ({
  onDelete,
  onRefresh,
  ...props
}) => {
  useEffect(() => {
    if (!props.occurence) {
      onRefresh(props.tagName);
    }
  }, []);

  return (
    <tr>
      <td className="px-5 py-4 whitespace-nowrap text-gray-400">
        {props.index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{props.tagName}</td>
      <td className="px-6 py-4 truncate">{props.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {props.loading ? "..." : props.occurence}
        {!props.loading && props.err ? props.err.toString() : ""}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-indigo-600 hover:text-indigo-900 mr-2"
          onClick={() => onRefresh(props.tagName)}
        >
          Refresh
        </button>
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => onDelete(props.tagName)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleTag;
