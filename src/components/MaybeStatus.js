import React from 'react';
import MaybeError from './MaybeError';
import MaybeSpinner from './MaybeSpinner';

export default (errorConditional, spinnerConditional) => ({
  message,
  ...props
}) => {
  const Error = MaybeError(errorConditional);
  const Spinner = MaybeSpinner(spinnerConditional);
  return (
    <Error message={message} {...props}>
      <Spinner {...props} />
    </Error>
  );
};
