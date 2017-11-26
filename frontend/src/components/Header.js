import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
        <Navbar inverse fixedTop className="">
          <div className="col-md-8">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Shop Back</Link>
              </Navbar.Brand>
            </Navbar.Header>
          </div>
          <div className="col-md-4">
            <ul className="custom-menu">
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/audience'>Audience</Link></li>
            </ul>
          </div>
        </Navbar>
        )
    }
}

export default Header