import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  refresher: state.refresher
});

const mapDispatchToProps = dispatch => ({
  setUp: dispatch.refresher.setUp,
  skipWaiting: dispatch.refresher.skipWaiting
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
