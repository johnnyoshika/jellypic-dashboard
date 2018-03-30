import { connect } from 'react-redux';
import { setUp, skipWaiting } from '../../actions/refresher';
import View from './View';

const mapDispatchToProps = {
  setUp,
  skipWaiting
};

const mapStateToProps = state => ({
  refresher: state.refresher
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
