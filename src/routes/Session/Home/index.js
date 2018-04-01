import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  home: state.routeHome,
  entities: state.entities2
});

const mapDispatchToProps = dispatch => ({
  fetchLatest: dispatch.routeHome.fetchLatest,
  fetchNext: dispatch.routeHome.fetchNext
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
