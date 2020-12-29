import React from "react";
import { WhiteLabelTagPayload } from "../../stores/tags";
import { WL_TAG_PREFIX } from "../../../core/constants";

import "./styles.css";

interface NewTagFormProps {
  onSubmit: (formValues: WhiteLabelTagPayload) => void;
}

const initialFormValues: WhiteLabelTagPayload = {
  tagName: "",
  description: "",
};

const NewTagForm: React.FC<NewTagFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = React.useState(initialFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // add __WT- here
    if (!formValues.tagName.startsWith(WL_TAG_PREFIX)) {
      formValues.tagName = `${WL_TAG_PREFIX}${formValues.tagName}`;
    }

    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="tags-new w-4/6 mb-3">
      <form onSubmit={handleSubmit}>
        <div className="form-new-tag__inner grid grid-cols-6 gap-3">
          <div className="flex rounded-md shadow-sm col-span-4">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              {WL_TAG_PREFIX}
            </span>
            <input
              type="text"
              className="input-text flex-1 block rounded-none rounded-r-md sm:text-sm"
              name="tagName"
              value={formValues.tagName}
              placeholder="Input tag name here"
              autoFocus
              autoComplete="off"
              onChange={handleChange}
              tabIndex={1}
              required
            />
          </div>
          <button className="btn-new-tag-form-submit col-span-1" type="submit">
            Add new tag
          </button>
          <div className="col-span-6">
            <input
              type="text"
              className="w-full input-text rounded"
              name="description"
              value={formValues.description}
              placeholder="description"
              onChange={handleChange}
              autoComplete="off"
              tabIndex={2}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTagForm;
