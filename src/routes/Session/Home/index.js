import { connect } from 'react-redux';
import { fetchLatest, fetchNext } from '../../../actions/routes/home';
import View from './View';

const mapStateToProps = state => ({
  home: state.routes.home,
  entities: state.entities
});

const mapDispatchToProps = {
  fetchLatest,
  fetchNext
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
