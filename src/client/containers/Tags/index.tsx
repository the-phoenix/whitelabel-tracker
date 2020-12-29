import React, { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleTag from "../../components/SingleTag";
import NewTagForm from "../../components/NewTagForm";

import "./Tags.css";
import {
  selectTags,
  WhiteLabelTagPayload,
  addNewTag,
  deleteTag,
  queryOccurence,
} from "../../stores/tags";

type TagFilter = "all" | "valid";

export default function Home() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<TagFilter>("all");
  const tags = useSelector(selectTags);
  const handleAddNew = (formValues: WhiteLabelTagPayload) =>
    dispatch(addNewTag(formValues));

  const handleDelete = (tagName: string) => dispatch(deleteTag(tagName));
  const handleRefresh = (tagName: string) => dispatch(queryOccurence(tagName));

  return (
    <div className="tags">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <NewTagForm onSubmit={handleAddNew} />
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
              {Object.values(tags).map((tag, index) => (
                <SingleTag
                  key={tag.tagName}
                  {...tag}
                  index={index}
                  onDelete={handleDelete}
                  onRefresh={handleRefresh}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
