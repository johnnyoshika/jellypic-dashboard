import { connect } from 'react-redux';
import { setUp, skipWaiting } from '../../actions/refresher';
import View from './View';

const mapStateToProps = state => ({
  refresher: state.refresher
});

const mapDispatchToProps = {
  setUp,
  skipWaiting
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
