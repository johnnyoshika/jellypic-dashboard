import { connect } from 'react-redux';
import { fetchProfile } from '../../../../actions/routes/userProfile';
import View from './View';

const mapDispatchToProps = {
  fetchProfile
};

const mapStateToProps = state => ({
  userProfile: state.routes.userProfile,
  entities: state.entities
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
