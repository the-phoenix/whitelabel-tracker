import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SingleTag from "../../components/SingleTag";
import NewTagForm from "../../components/NewTagForm";
import {
  selectTags,
  WhiteLabelTagPayload,
  addNewTag,
  deleteTag,
  updateTag,
  queryOccurence,
  TagName,
  WhiteLabelTagUpdatePayload,
} from "../../stores/tags";
import { downloadJSON } from "../../_helper";
import { WL_TAG_PREFIX } from "../../../core/constants";

import "./Tags.css";

// type TagFilter = "all" | "valid";

const EXPORT_FILENAME = "whitelabel_tags.json";

export default function Home() {
  const dispatch = useDispatch();
  // const [filter, setFilter] = useState<TagFilter>("all");
  const tags = useSelector(selectTags);
  const handleAddNew = (formValues: WhiteLabelTagPayload) =>
    dispatch(addNewTag(formValues));

  const handleDelete = (tagName: TagName) => dispatch(deleteTag(tagName));
  const handleUpdate = (modified: WhiteLabelTagUpdatePayload) =>
    dispatch(updateTag(modified));
  const handleRefresh = (tagName: TagName) => dispatch(queryOccurence(tagName));
  const isFresh = (tagName: TagName) =>
    tags.findIndex((t) => t.tagName === tagName) < 0;
  const handleExport = () => {
    const json = tags.reduce((acc, curr) => {
      const fullTagName = `${WL_TAG_PREFIX}${curr.tagName}`;
      acc[fullTagName] = curr.description;

      return acc;
    }, {} as { [k: string]: string });

    downloadJSON(EXPORT_FILENAME, json);
  };

  return (
    <div className="tags">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <NewTagForm onSubmit={handleAddNew} isFresh={isFresh} />
          <div className="self-center">
            <button className="btn-export w-40" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="tags-filter"></div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  tag name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2">
                  occurence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tags.map((tag, index) => (
                <SingleTag
                  key={tag.tagName}
                  {...tag}
                  index={index}
                  onDelete={handleDelete}
                  onRefresh={handleRefresh}
                  onUpdate={handleUpdate}
                  isFresh={isFresh}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
