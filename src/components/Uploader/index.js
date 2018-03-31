import { connect } from 'react-redux';
import { savePost } from '../../actions/uploader';
import View from './View';

const mapStateToProps = state => ({
  uploader: state.uploader
});

const mapDispatchToProps = {
  savePost
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
