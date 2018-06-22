import React, { Component } from 'react'

import Grid from '../shared/Grid'

export default class App extends Component {
  render() {
    return (
      <h1>
        <Grid data={this.props.data} />
      </h1>
    )
  }
}
