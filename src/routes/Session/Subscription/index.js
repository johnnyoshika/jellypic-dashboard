import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  subscriber: state.subscriber
});

const mapDispatchToProps = dispatch => ({
  check: dispatch.subscriber.check,
  subscribe: dispatch.subscriber.subscribe,
  unsubscribe: dispatch.subscriber.unsubscribe
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
