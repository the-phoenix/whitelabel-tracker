import React from 'react'
import {
  WhiteLabelTagPayload,
} from "../../stores/tags";

import "./styles.css";

interface NewTagFormProps {
  onSubmit: (formValues: WhiteLabelTagPayload) => void
}

const initialFormValues: WhiteLabelTagPayload = {
  tagName: '',
  description: ''
}

const NewTagForm: React.FC<NewTagFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = React.useState(initialFormValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  }

  return (
    <div className="tags-new mb-2 mt-2">
      <form onSubmit={handleSubmit}>
        <div className="form-new-tag__inner">
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-2 py-1.5 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              __WT-
            </span>
            <input
              type="text"
              className="input-text flex-1 block w-full rounded-none rounded-r-md sm:text-sm"
              name="tagName"
              value={formValues.tagName}
              placeholder="tag name starts with __WT-"
              onChange={handleChange}
            />
          </div>
            <input
              type="text"
              className="my-3"
              name="description"
              style={{ border: "1px solid black" }}
              value={formValues.description}
              placeholder="description"
              onChange={handleChange}
            />
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTagForm