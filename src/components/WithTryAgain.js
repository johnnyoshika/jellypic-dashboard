import React from 'react';

export default (conditional, onTryAgainFetch) => props =>
  conditional(props) && (
    <div className="text-center">
      <button className="btn btn-primary" onClick={() => onTryAgainFetch(props)}>
        Try Again
      </button>
    </div>
  );
