import { connect } from 'react-redux'
import { savePost } from '../../actions/uploader'
import View from './View'

const mapDispatchToProps = {
  savePost
}

const mapStateToProps = (state) => ({
  uploader: state.uploader
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
