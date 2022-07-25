import React, { Component } from 'react'
import superagent from 'superagent'
import Message from './Message';
import Navbar from './Navbar';
import Home from './Home';
export class Signup extends Component {
    constructor() {
        super();

        this.state = {
            name: "rajul",
            email: "thakurajul10@gmail.com",
            password: "123",
            confirmPassword: "123",
            message: "",
            token: ""
        }
    }

    generateErrorMessage = (message, type) => {
        this.setState({
            message,
            type
        })
        setTimeout(() => {
            this.setState({
                message: "",
                type: ""
            })
        }, 2000);
    }

    componentDidMount () {
        this.setState({
            token: localStorage.getItem("token") !== null ? "token" : ""
        })
    }

    handelSubmit = async (e) => {
        e.preventDefault()
        let check = this.state.name === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "" || this.state.country === "" || this.state.State === "" || this.state.city === ""


        if (check) {
            this.generateErrorMessage("All fields required", "danger")
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.generateErrorMessage("Password should be same", "danger")
            return;
        }
        const data = new FormData()
        data.append("name", this.state.name)
        data.append("email", this.state.email)
        data.append("password", this.state.password)


        await superagent
            .post("http://localhost:8080/signup", data)
            .then((res) => {
                localStorage.setItem("token", res.text);
                this.generateErrorMessage("User registered successful", "success")

            }).catch((err) => {
                this.generateErrorMessage("User already exist", "danger")
            });
    }

    render () {
        return (
            <>
                {this.state.token === "" ?
                    <><Navbar />
                        <div className='container'>
                            {this.state.message !== "" && <Message message={this.state.message} type={this.state.type} />}
                            <form style={{ "marginTop": "15px" }} onSubmit={(e) => { this.handelSubmit(e) }}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input onChange={(e) => { this.setState({ email: e.target.value }) }} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input onChange={(e) => { this.setState({ name: e.target.value }) }} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label name="password" htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                    <input onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} name="confPass" type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type='submit' className="btn btn-primary">Submit</button>
                            </form>
                        </div></> : <Home />}
            </>
        )
    }
}

export default Signup