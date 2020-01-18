import React from 'react';

export const NotesList = props => {
  return <ul className="notes-list">{props.children} </ul>;
};
