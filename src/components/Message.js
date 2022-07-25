import React, { Component } from 'react'

export class Message extends Component {
    render (props) {
        const { message, type } = this.props
        return (
            <div style={{
                "width": "96.5%",
                "margin": "auto",
                "paddingBlock": "10px",
                "marginTop": "5px"
            }} className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        )
    }
}

export default Message