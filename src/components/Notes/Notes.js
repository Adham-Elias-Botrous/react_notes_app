import React from 'react';

export const Notes = props => {
  const { editing, creating, children } = props;
  return (
    <div className={!creating && !editing ? 'notes-section' : ' disappear'}>
      {children}
    </div>
  );
};
