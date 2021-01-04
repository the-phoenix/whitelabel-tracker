import React from "react";

import { WhiteLabelTagPayload, TagName } from "../../stores/tags";
import WLTagInput from "../WLTagInput";
import useFocusInput from "../../hooks/FocusInput";

import "./styles.css";

interface NewTagFormProps {
  isFresh: (tagName: TagName) => boolean;
  onSubmit: (formValues: WhiteLabelTagPayload) => void;
}

const initialFormValues: WhiteLabelTagPayload = {
  tagName: "",
  description: "",
};

const NewTagForm: React.FC<NewTagFormProps> = ({ onSubmit, isFresh }) => {
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [inputRef, setInputFocus] = useFocusInput();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFresh(formValues.tagName)) {
      alert("Already registered tag name");
      return setInputFocus(true);
    }

    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="tags-new w-4/6 mb-3">
      <form onSubmit={handleSubmit}>
        <div className="form-new-tag__inner grid grid-cols-6 gap-3">
          <WLTagInput
            className="flex rounded-md shadow-sm col-span-4"
            name="tagName"
            value={formValues.tagName}
            placeholder="Input tag name here"
            autoFocus
            autoComplete="off"
            onChange={handleChange}
            tabIndex={1}
            required
            ref={inputRef}
          />
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
              // ref={inputRef}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTagForm;
