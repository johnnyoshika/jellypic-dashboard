import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  checkFacebook: dispatch.login.checkFacebook,
  loginWithFacebook: dispatch.login.loginWithFacebook
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
