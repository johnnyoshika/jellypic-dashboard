import React from 'react';
import WithError from './WithError';
import WithSpinner from './WithSpinner';

export default (errorConditional, spinnerConditional) => ({
  message,
  ...props
}) => {
  const Error = WithError(errorConditional);
  const Spinner = WithSpinner(spinnerConditional);
  return (
    <Error message={message} {...props}>
      <Spinner {...props} />
    </Error>
  );
};
