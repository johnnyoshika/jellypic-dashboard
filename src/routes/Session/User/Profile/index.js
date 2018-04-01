import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  userProfile: state.routeUserProfile,
  entities: state.entities2
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: id => dispatch.routeUserProfile.fetchProfile({ id })
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
