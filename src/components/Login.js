import React, { Component } from 'react'
import superagent from 'superagent'
import Message from './Message';
import Navbar from './Navbar';
import UserDashbord from './UserDashbord';
import AdminDashbord from './AdminDashbord';
import Home from './Home';
export class Login extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            password: "",
            errorMess: "",
            type: "",
            token:""
        }
    }

    generateErrorMessage = (errorMess, type) => {
        this.setState({
            errorMess,
            type
        })
        setTimeout(() => {
            this.setState({
                errorMess: "",
                type: ""
            })
        }, 2000);
    }

    login = async (e) => {
        e.preventDefault()
        if (this.state.name === "" || this.state.password === "") {
            this.generateErrorMessage("All fields required", "danger")
            return;
        }
        let data = { userName: this.state.name, password: this.state.password }
        console.log(data)
        await superagent
            .post("http://localhost:8080/authenticate", data)
            .then(async res => {
                console.log(res.text)
                if (res.status === 200) {

                    localStorage.setItem("token", res.text);
                    this.generateErrorMessage("Logged in successful", "success")
                }
            }).catch((err) => {
                this.generateErrorMessage("Invalid details!","danger")
                console.log(err);
            });

    }

        componentDidMount(){
            this.setState({
                token:localStorage.getItem("token")!==null?"token":""
            })
        }

    render () {
        return (
            <>
                {this.state.token === "" ?
                <><Navbar/>
                <div className='container'>
                    {this.state.errorMess !== "" && <Message message={this.state.errorMess} type={this.state.type} />}
                    <form style={{ "marginTop": "15px"}} onSubmit={(e) => { this.login(e) }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input onChange={(e) => { this.setState({ name: e.target.value }) }} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label name="password" htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form> 
                </div></>:<Home/>}
            </>

        )
    }
}

export default Login