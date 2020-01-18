import React, { useEffect } from 'react';
import WithError from '../../components/WithError';
import './Styles.css';

const Status = WithError(
  props => props.login.status === 'error'
);

const Login = ({
  login,
  loginWithFacebook,
  checkFacebook,
  history
}) => {

  useEffect(() => {
    checkFacebook();
  }, []);

  useEffect(() => {
    if (login.status === 'success') history.push('/');
  }, [login.status]);

  const disabled = () => login.status === 'processing' || login.status === 'success';

  return (
    <div className="login-container">
      <div className="gutter" />
      <div className="login-main">
        <div className="font-lobster text-center mb-40">Jellypic</div>
        <div className="text-center">
          <Status message={login.error} login={login}>
            <button
              className="btn btn-primary btn-lg"
              disabled={disabled()}
              onClick={() => loginWithFacebook()}
            >
              Log in with Facebook
            </button>
          </Status>
        </div>
      </div>
      <div className="gutter" />
    </div>
  );
};

export default Login;
