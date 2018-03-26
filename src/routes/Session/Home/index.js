import { connect } from 'react-redux';
import { fetchLatest, fetchNext } from '../../../actions/routes/home';
import View from './View';

const mapDispatchToProps = {
  fetchLatest,
  fetchNext
};

const mapStateToProps = state => ({
  home: state.routes.home,
  entities: state.entities
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
