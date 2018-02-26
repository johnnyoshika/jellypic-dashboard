import { connect } from 'react-redux';
import View from './View';

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
