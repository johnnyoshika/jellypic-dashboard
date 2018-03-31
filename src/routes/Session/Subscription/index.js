import { connect } from 'react-redux';
import { check, subscribe, unsubscribe } from '../../../actions/subscriber';
import View from './View';

const mapStateToProps = state => ({
  subscriber: state.subscriber
});

const mapDispatchToProps = {
  check,
  subscribe,
  unsubscribe
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
