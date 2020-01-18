import React from 'react';

export const Note = props => {
  const { title, noteClicked, active } = props;

  return (
    <li className={`note-item ${active && 'active'}`} onClick={noteClicked}>
      {title}
    </li>
  );
};
