import React from 'react';

export default conditional => ({ message, ...props }) => (
  <>
    {props.children}
    {conditional(props) && (
      <div className="text-center">
        <div className="error">{message}</div>
      </div>
    )}
  </>
);
