import React, { Component } from 'react'
import superagent from 'superagent';
import ImagePrev from './ImagePrev';
import Loader from './Loader';
import Navbar from './Navbar';
export class UserDashbord extends Component {
    constructor() {
        super();
        this.state = ({
            userData: {},
            documents: [],
            userDoc: [],
            docs: [],
            fileInfo: {},
            imageUrl: "",
            load:true
        })
    }
    getDocuments = async () => {
        let data = await superagent
            .get("http://localhost:8080/")
        this.setState({
            documents: data.body,
        })
        return data.body;
    }

    getUserDetails = async () => {
        let url = localStorage.getItem("token");
        let data = await superagent
            .get(`http://localhost:8080/extractuser/${url}`)
        console.log(data);
        this.setState({
            userData: data.body,
        })
        return data.body.status;
    }

    helper = async () => {
        let userdata = []; userdata = await this.getUserDetails();
        let docData = []; docData = await this.getDocuments();
        let arr = [];
        userdata.forEach(element => {
            arr.push(element.documents)
        });
        let temp = [];
        for (let i = 0; i < docData.length; i++) {
            let d = { doc: docData[i], kycDone: -1, path: "" };
            for (let j = 0; j < arr.length; j++) {
                if (docData[i].id === arr[j].id) {
                    let userData = userdata[j]
                    d = { doc: docData[i], kycDone: userData.isKycDone, path: userData.path };
                }
            }
            temp.push(d);
        }
        this.setState({
            userDoc: temp
        })
    }
    componentDidMount () {
        setTimeout(() => {
            this.helper();
            this.setState({
                load:false
            })
        }, 500);
    }
    logout = () => {
        localStorage.removeItem("token");

    }
    submit = async (e, name) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", this.state.fileInfo)
        data.append("email", this.state.userData.email)
        data.append("docName", name)


        await superagent
            .post("http://localhost:8080/upload-file", data)
        this.helper();
    }
    render () {

        return (
            <div>
                <Navbar />
                {this.state.load===true?<Loader/>:
                <div className="container details">
                    <div className="userInfo">
                        <div className="userStatus">
                            <p>Hello, <strong className='colorField'>{this.state.userData.name}</strong></p>
                            <p><strong className="colorField">KYC</strong> : {this.state.userData.verified === false ? "Pending" : "Completed"}</p>
                        </div>
                        <div className="email">
                            <p><strong className="colorField">{this.state.userData.email}</strong></p>
                        </div>
                    </div>
                    <table className="table table-secondary table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Document Name</th>
                                <th scope="col">Attach</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userDoc.map((ele, idx) => {
                                return <>{
                                    idx < this.state.userData.docCount &&
                                    <tr>
                                        <td scope="row">{idx + 1}</td>
                                        <td>{ele.doc.docName}</td>
                                        <td>
                                            {(ele.path === "" || ele.kycDone === 2) ? <form onSubmit={(e, name) => { this.submit(e, ele.doc.id) }}>
                                                <input type="file" onChange={(e) => { this.setState({ fileInfo: e.target.files[0] }) }}></input>
                                                <button
                                                    style={{
                                                        "border": "none",
                                                        "background": "#20c997",
                                                        "color": "white",
                                                        "borderRadius": "4px"
                                                    }} type="submit">add</button>
                                            </form> : "Uploaded"}
                                        </td>
                                        <td>{ele.kycDone === -1 ? "Not Submitted" : ele.kycDone === 0 ?
                                            <button type="button" style={
                                                {
                                                    "padding": "0px",
                                                    "marginTop": "-5px"
                                                }
                                            } className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                this.setState({
                                                    imageUrl: ele.path
                                                });
                                            }}><strong>Pending</strong></button> : ele.kycDone === 1 ? <button type="button" style={
                                                {
                                                    "padding": "0px",
                                                    "marginTop": "-5px"
                                                }
                                            } className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                this.setState({
                                                    imageUrl: ele.path
                                                });
                                            }}><strong style={{ "color": "#20c997" }}>Accepted</strong></button> : ele.kycDone === 2 && <button type="button" style={
                                                {
                                                    "padding": "0px",
                                                    "marginTop": "-5px"
                                                }
                                            } className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                this.setState({
                                                    imageUrl: ele.path
                                                });
                                            }}><strong style={{ "color": "red" }}>Rejected</strong></button>}</td>
                                    </tr>

                                }
                                </>
                            })}
                        </tbody>
                    </table>
                </div>}
                <ImagePrev imageUrl={this.state.imageUrl} />
            </div>
        )
    }
}

export default UserDashbord