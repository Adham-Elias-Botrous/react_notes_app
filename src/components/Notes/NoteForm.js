import React from 'react';

export const NoteForm = props => {
  const {
    formTitle,
    title,
    content,
    titleChanged,
    contentChanged,
    submitClicked,
    canceling
  } = props;
  return (
    <div>
      <h2>{formTitle}</h2>
      <div>
        <input
          type="text"
          name="title"
          className="form-input mb-30"
          autoComplete="off"
          placeholder="The title"
          value={title}
          onChange={titleChanged}
        />

        <textarea
          rows="10"
          name="content"
          className="form-input"
          placeholder="The content"
          autoComplete="off"
          value={content}
          onChange={contentChanged}
        />
        <div className="btn-div">
          <button onClick={submitClicked}>Save</button>
          <button onClick={canceling}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
