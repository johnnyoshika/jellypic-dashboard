import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  savePost: cloudinaryPublicIds =>
    dispatch.uploader.savePost({ cloudinaryPublicIds })
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
