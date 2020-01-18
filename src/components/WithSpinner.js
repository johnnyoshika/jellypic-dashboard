import React from 'react';

export default conditional => props => (
  <>
    {props.children}
    {conditional(props) && (
      <div className="text-center mt-40 mb-40">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    )}
  </>
);
