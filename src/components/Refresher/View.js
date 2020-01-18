import React, { useEffect } from 'react';
import './Styles.css';

const Refresher = ({
  refresher,
  setUp,
  skipWaiting
}) => {

  useEffect(() => {
    setUp();
  }, []);

  const reload = () => skipWaiting();

  return (
    <>
      {refresher.status !== 'fresh' && (
        <div className="refresher-container">
          <span>This site has updated!</span>
          <span>
            <button
              className="btn btn-primary"
              disabled={refresher.status === 'activating'}
              onClick={reload}
            >
              Reload
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default Refresher;
