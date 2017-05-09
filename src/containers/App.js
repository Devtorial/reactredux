import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendEmail, update } from '../actions'

class App extends Component {
  handleClick = (email) => {
    sendEmail(email)(this.props.dispatch);
  }

  handleChange = (event) => {
    this.props.dispatch(update(event.target.value));
  }

  render() {
    return (
      <div>
        <input type="text" value={this.props.email} onChange={this.handleChange}/> 
        <input type="button" value="check" onClick={() => this.handleClick(this.props.email)} disabled={this.props.status.isFetching}/>
        <h2>{this.props.status.name}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { email, status, isFetching } = state
  return { email, status, isFetching }
}

export default connect(mapStateToProps)(App)
