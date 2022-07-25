import React, { Component } from 'react'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import UserDashbord from './components/UserDashbord'
import Login from './components/Login'
import AdminDashbord from './components/AdminDashbord'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
export class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          {/* <Route path="userpage" element={<UserDashbord />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="adminpage" element={<AdminDashbord />} /> */}
        </Routes>
      </Router>
    )
  }
}

export default App