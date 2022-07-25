import React, { Component } from 'react'
import superagent from 'superagent'
import ImagePrev from './ImagePrev';
import Loader from './Loader';
import Navbar from './Navbar';

export class AdminDashbord extends Component {
    constructor() {
        super();
        this.state = ({
            allUsers: [],
            singleUser: [],
            email: "",
            id: "",
            name: "",
            changeType: 0,
            imageUrl: "",
            docType: "",
            message: "",
            docCount: 0,
            load: true
        })
    }
    getAllUsers = async () => {
        let data = await superagent
            .get("http://localhost:8080/admin/alluser")
        this.setState({
            allUsers: data.body
        })
    }


    adminResponse = async (adminRes, id) => {
        const data = new FormData()
        data.append("email", this.state.email)
        data.append("id", id)
        data.append("adminResponse", adminRes)
        await superagent
            .post("http://localhost:8080/admin/verify", data)
            .then((res) => {
                this.setState({
                    singleUser: res.body.status
                })
                if (res.body.verified) {
                    this.getAllUsers();
                }

            }).catch((err) => {
                console.log(err);
            });
    }

    addDoc = async () => {
        const data = new FormData()
        data.append("documentName", this.state.docType)
        let res = await superagent
            .post("http://localhost:8080/adddocumenttype", data)
        this.setState({
            message: res.text,
            docType: ""
        })
        setTimeout(() => {
            this.setState({
                message: ""
            })
        }, 1500);
    }

    componentDidMount () {
        setTimeout(() => {
            this.getAllUsers()
            this.setState({
                load: false
            })
        }, 500);
    }


    render () {
        return (
            <div>

                <Navbar />
                {this.state.load === true ? <Loader /> :
                    <div className='container'>
                        <div className='docTypeContainer'><h2>Verification Page </h2>
                            {this.state.message !== "" &&
                                <div className="message"><strong style={{ "color": "#20c997" }}>{this.state.message}</strong></div>
                            }
                            <div className='addDocContainer'>
                                <input className='addDocInput' value={this.state.docType} onChange={(e) => this.setState({ docType: e.target.value })} type="text" name="docType" />
                                <button className='addDocBtn' onClick={() => { this.addDoc() }}>Add</button>
                            </div>
                        </div>
                        <table className="table table-secondary table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Documents</th>
                                    <th scope="col">KYC</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allUsers.map((ele, idx) => {
                                    return <>
                                        {ele.email !== "admin@gmail.com" &&
                                            <tr>
                                                <th scope="row">{idx + 1}</th>
                                                <td>{ele.name}</td>
                                                <td>{ele.email}</td>
                                                <td><button type="button" style={{ "background": "#20c997", "border": "none" }} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => {
                                                    this.setState({
                                                        singleUser: ele.status,
                                                        email: ele.email,
                                                        id: ele.id,
                                                        name: ele.name,
                                                        docCount: ele.docCount
                                                    });
                                                }}>View</button></td>
                                                <td>{ele.verified === true ? <strong style={{ "color": "#20c997" }}>Kyced</strong> : <strong style={{ "color": "Red" }}>Not done</strong>}</td>
                                            </tr>}
                                    </>
                                })}

                            </tbody>
                        </table>
                    </div>
                }
                <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Verify Documents</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <strong>{this.state.name}</strong>
                                {this.state.singleUser.length === 0 ? <h3 style={{ "color": "red" }}>Documents not submitted yet!</h3> :
                                    <table className="container table table-secondary table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Document Type</th>
                                                <th scope="col">
                                                    Response
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.singleUser.map((ele, idx) => {
                                                return <>
                                                    <tr>
                                                        <th scope="row">{idx + 1}</th>
                                                        <td><button type="button" style={
                                                            {
                                                                "padding": "0px",
                                                                "marginTop": "-5px"
                                                            }
                                                        } className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                            this.setState({
                                                                imageUrl: ele.path
                                                            });
                                                        }}>{ele.documents.docName}</button></td>
                                                        <td>
                                                            {ele.isKycDone === 1 ? <strong style={{ "color": "Green" }}>Accepted</strong> : ele.isKycDone === 2 ? <strong style={{ "color": "Red" }}>Rejected</strong> :
                                                                <><button onClick={(response, id) => { this.adminResponse(1, ele.id) }} className='customBtn btn m-1 btn-success'>✔</button>
                                                                    <button style={{ "marginLeft": "5px" }}
                                                                        onClick={(response, id) => { this.adminResponse(2, ele.id) }} className='customBtn btn btn-danger'>✖</button></>}
                                                        </td>
                                                    </tr>
                                                </>

                                            })}

                                        </tbody>
                                    </table>}
                                {/* <div> */}
                                <strong style={{ "color": "#20c997" }}>{this.state.docCount - this.state.singleUser.length === 0 ? "All documents are Submitted." : `${this.state.docCount - this.state.singleUser.length} document remaining to complete KYC.`}</strong>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <ImagePrev imageUrl={this.state.imageUrl} />
            </div >


        )
    }
}

export default AdminDashbord