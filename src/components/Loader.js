import React, { Component } from 'react'
import loder from "./images/loder2.gif"
export class Loader extends Component {
  render() {
    return (
        <div style={{ width: "max-content", margin: "auto", marginBlock: "100px" }}>
        <img src={loder} alt="not available" />
        <p>processing...</p>
    </div>
    )
  }
}

export default Loader