import React, { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleTag from "../../components/SingleTag";

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
  const [tagName, setTagName] = useState("");
  const [description, setDescription] = useState("");
  const tags = useSelector(selectTags);

  const handleAddNew = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tagName.startsWith("__WT-")) {
      return alert("TagName should start with __WT-");
    } else if (tags[tagName]) {
      return alert("Existing tag!");
    }

    const payload: WhiteLabelTagPayload = {
      tagName,
      description,
    };

    dispatch(addNewTag(payload));
    setTagName("");
    setDescription("");
  };

  const handleDelete = (tagName: string) => dispatch(deleteTag(tagName));

  const handleRefresh = (tagName: string) => dispatch(queryOccurence(tagName));

  return (
    <div className="tags">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="tags-new">
            <form onSubmit={handleAddNew}>
              <div>
                <input
                  type="text"
                  className="my-3"
                  style={{ border: "1px solid black" }}
                  value={tagName}
                  placeholder="tag name starts with __WT-"
                  onChange={(e) => setTagName(e.target.value)}
                />
                <input
                  type="text"
                  className="my-3"
                  style={{ border: "1px solid black" }}
                  value={description}
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
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
        </div>
      </div>
      <div className="tags-filter"></div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    tag name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    occurence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
    </div>
  );
}
