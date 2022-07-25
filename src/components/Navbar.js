import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navbar extends Component {
    constructor() {
        super();
        this.state = ({
            token: ""
        })
    }
    componentDidMount () {
        this.setState({
            token: localStorage.getItem("token") !== null ? "token" : ""
        })
    }
    render () {
        return (
            <nav className='navbar bg-dark'>
                <div>
                    <Link className="mx-2" to="/">Dashboard</Link>
                    {this.state.token === "" ? <>
                        <Link className="mx-2" to="/login">login</Link>
                        <Link className="mx-2" to="/">signup</Link>
                    </> : <Link to="/login"> <button onClick={() => {
                        localStorage.removeItem("token");
                        this.setState({
                            token: ""
                        })


                    }} style={{ "color": "red" }} className='btn'>Log-out</button></Link>}
                </div>

            </nav>
        )
    }
}

export default Navbar