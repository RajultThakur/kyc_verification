import React, { Component } from 'react'
import Signup from './Signup'
import UserDashbord from './UserDashbord'
import superagent from 'superagent';
import AdminDashbord from './AdminDashbord';
import Loader from './Loader';
export class Home extends Component {
  constructor() {
    super();
    this.state = ({
      email: "",
      image: ""
    })
    this.getUserDetails();
  }

  getUserDetails = async () => {
    let url = localStorage.getItem("token");
    if (url !== null) {

      let data = await superagent
        .get(`http://localhost:8080/extractuser/${url}`)
      console.log(data);
      this.setState({
        email: data.body.email,
      })
      return data.body.status;
    }

    let data1 = await superagent
      .get(`http://localhost:8080/download/1658321667497WIN_20211201_09_18_47_Pro.jpg`)
    console.log(data1.text);
    this.setState({
      image: data1.text
    })
  }

  componentDidMount () {
  }
  render () {
    return (
      <div>
        {/* <Loader/> */}

        {
          localStorage.getItem("token") === null ? <Signup /> :
            this.state.email === "admin@gmail.com" ? <AdminDashbord /> :
              <UserDashbord />
        }

      </div>
    )
  }
}

export default Home