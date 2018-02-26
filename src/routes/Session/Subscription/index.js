import { connect } from 'react-redux'
import { toggle } from '../../../actions/subscriber'
import View from './View'

const mapDispatchToProps = {
  toggle
}

const mapStateToProps = (state) => ({
  subscriber: state.subscriber
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
