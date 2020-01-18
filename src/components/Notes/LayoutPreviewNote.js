import React from 'react';
import Message from '../Message/Message';
import { NoteForm } from './NoteForm';

export const LayoutPreviewNote = props => {
  const {
    notes,
    idSelectedNote,
    title,
    content,
    changeTitle,
    changeContent,
    updateNote,
    editing,
    editNote,
    deleteNote,
    canceling
  } = props;
  if (notes.length === 0) {
    return <Message msg="The notes list is empty." />;
  }
  if (!idSelectedNote) {
    return <Message msg=" Please choose a note." />;
  }
  const note = notes.filter(note => note.id === idSelectedNote)[0];
  let noteDisplay = (
    <div>
      <h2 className="note-title">{note.title}</h2>
      <p className="note-content">{note.content}</p>
    </div>
  );
  if (editing) {
    noteDisplay = (
      <NoteForm
        formTitle="Edit the note"
        title={title}
        content={content}
        titleChanged={changeTitle}
        contentChanged={changeContent}
        submitClicked={updateNote}
        canceling={canceling}
      />
    );
  }
  return (
    <div>
      {!editing && (
        <div className="note-operations">
          <span onClick={editNote}>
            <i className="fa fa-pencil-alt" />
          </span>
          <span onClick={deleteNote}>
            <i className="fa fa-trash" />
          </span>
        </div>
      )}
      {noteDisplay}
    </div>
  );
};
