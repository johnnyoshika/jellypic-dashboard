import { connect } from 'react-redux'
import { authenticate } from '../../actions/session'
import View from './View'

const mapDispatchToProps = {
  authenticate
}

const mapStateToProps = (state) => ({
  session: state.session
})

export default connect(mapStateToProps, mapDispatchToProps)(View)