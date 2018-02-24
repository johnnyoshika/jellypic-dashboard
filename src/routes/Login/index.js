import { connect } from 'react-redux';
import { checkFacebook, loginWithFacebook } from '../../actions/login';
import View from './View';

const mapDispatchToProps = {
  checkFacebook,
  loginWithFacebook
};

const mapStateToProps = state => ({
  login: state.routes.login
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
