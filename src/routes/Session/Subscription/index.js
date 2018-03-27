import { connect } from 'react-redux'
import { check, subscribe, unsubscribe } from '../../../actions/subscriber'
import View from './View'

const mapDispatchToProps = {
  check,
  subscribe,
  unsubscribe
}

const mapStateToProps = (state) => ({
  subscriber: state.subscriber
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
