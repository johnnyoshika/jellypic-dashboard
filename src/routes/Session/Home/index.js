import { connect } from 'react-redux';
import { fetchNext } from '../../../actions/home';
import View from './View';

const mapDispatchToProps = {
  fetchNext
};

const mapStateToProps = state => ({
  home: state.routes.home,
  entities: state.entities
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
