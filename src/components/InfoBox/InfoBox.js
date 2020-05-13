import './InfoBox.css'
import React from 'react';

export default class InfoBox extends React.Component {

  // prop.text: string
  // prop.type: info, success, error
  constructor(props){
    super (props)
    this.state = {open: true}
  }

  dismiss() {
    this.setState({
      open: false
    })
  }

  componentDidUpdate(prevProps) {
    // Make sure this component display
    // every time it gets a new value for 'text' prop
    if (this.props.text !== prevProps.text) {
      this.setState({open: true})
    }
  }

  render() {
    const open = this.state.open;

    // Try two different ways to validate props
    const text = ('text' in this.props) ? this.props.text : null
    const type = ! ( 'type' in this.props ) ? 'info'
      : ['info', 'success', 'error'].includes(this.props.type) ? this.props.type
      : 'info'

    // Build style classes
    const classes = ['info-box', type].join(' ')
    return ! ( text && open ) ? null : (
        <div className={classes}>
          {text} <button onClick={() => this.dismiss()} >Dismiss</button>
        </div>
    )

  }
}
