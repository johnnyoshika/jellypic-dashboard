import { connect } from 'react-redux';
import { fetchProfile } from '../../../../actions/routes/userProfile';
import View from './View';

const mapStateToProps = state => ({
  userProfile: state.routes.userProfile,
  entities: state.entities
});

const mapDispatchToProps = {
  fetchProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
