import React from 'react';

const Preview = props => {
  const { editing, creating, children } = props;
  return (
    <div
      className={
        !creating && !editing
          ? 'preview-section'
          : ' preview-section full-width'
      }>
      {children}
    </div>
  );
};
export default Preview;
