/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import WLTagInput from "../WLTagInput";
import Icon from "../Icon";
import {
  WhiteLabelTag,
  WhiteLabelTagPayload,
  WhiteLabelTagUpdatePayload,
} from "../../stores/tags";
import { WL_TAG_PREFIX } from "../../../core/constants";
import useSensitiveState from "../../hooks/SensitiveState";
import useFocusInput from "../../hooks/FocusInput";

import "./styles.css";

interface SingleTagsProps extends WhiteLabelTag {
  index: number;
  onDelete: (tagName: string) => void;
  onRefresh: (tagName: string) => void;
  onUpdate: (tag: WhiteLabelTagUpdatePayload) => void;
  isFresh: (tagName: string) => boolean;
}

const SingleTag: React.FC<SingleTagsProps> = ({
  onDelete,
  onRefresh,
  onUpdate,
  isFresh,
  ...props
}) => {
  const [inputRef, setInputFocus] = useFocusInput();
  const [editEnabled, setEditEnabled] = useState(false);
  const [tagValues, setTagValues] = useSensitiveState<WhiteLabelTagPayload>({
    tagName: props.tagName,
    description: props.description,
  });

  useEffect(() => {
    onRefresh(props.tagName);
  }, [props.tagName, props.description]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValues({ ...tagValues, [e.target.name]: e.target.value });
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleUpdate();
    else if (e.key === "Escape") handleCancel();
  };

  const handleCancel = () => {
    setTagValues({
      tagName: props.tagName,
      description: props.description,
    });
    setEditEnabled(false);
  };
  const handleUpdate = () => {
    if (tagValues.tagName !== props.tagName && !isFresh(tagValues.tagName)) {
      alert("Already registered tag name");
      return setInputFocus(true);
    }
    onUpdate({ ...tagValues, index: props.index });
    setEditEnabled(false);
  };

  return (
    <tr>
      <td className="px-5 py-4 whitespace-nowrap text-gray-400">
        {props.index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {editEnabled ? (
          <WLTagInput
            className="flex"
            autoFocus
            autoComplete="off"
            name="tagName"
            value={tagValues.tagName}
            ref={inputRef}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            required
          />
        ) : (
          `${WL_TAG_PREFIX}${props.tagName}`
        )}
      </td>
      <td className="px-6 py-4 truncate">
        {editEnabled ? (
          <input
            type="text"
            className="w-full input-text rounded"
            name="description"
            value={tagValues.description}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            placeholder="description"
            autoComplete="off"
          />
        ) : (
          props.description
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {props.loading ? "..." : props.occurence}
        {!props.loading && props.err ? props.err.toString() : ""}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {editEnabled ? (
          <>
            <button className="icon-btn" onClick={handleUpdate}>
              <Icon
                name="check"
                className="h-5 w-5 text-green-600 hover:text-green-600"
              />
            </button>
            <button className="icon-btn" onClick={handleCancel}>
              <Icon
                name="x"
                className="h-5 w-5 text-red-600 hover:text-red-600"
              />
            </button>
          </>
        ) : (
          <>
            <button
              className="icon-btn"
              onClick={() => onRefresh(props.tagName)}
            >
              <Icon
                name="reload"
                className="h-5 w-5 text-gray-600 hover:text-indigo-600"
              />
            </button>
            <button className="icon-btn" onClick={() => setEditEnabled(true)}>
              <Icon
                name="pencil-alt"
                className="h-5 w-5 text-gray-600 hover:text-indigo-600"
              />
            </button>
            <button
              className="icon-btn"
              onClick={() => onDelete(props.tagName)}
            >
              <Icon
                name="trash"
                className="h-5 w-5 text-red-600 hover:text-red-900"
              />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleTag;
