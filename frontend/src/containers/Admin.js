import React, { Component } from 'react'
import {
    UserService
} from '../services';
import Cookies from 'cookies-js';
import { Link } from 'react-router-dom'

class Admin extends Component {
    constructor() {
        super();
        const access_token = Cookies.get('access_token') || '';
        this.state = {
            username: '',
            password: '',
            showControl: (access_token.length > 0),
            errorMessage: ''
        }
        this._setText = this._setText.bind(this);
        this._login = this._login.bind(this);
    }
    _setText(fieldName, e) {
        const params = {};
        params[fieldName] = e.target.value;
        this.setState(params);
    }
    _login() {
        const {
            username,
            password
        } = this.state;
        UserService.login(username, password)
            .then((user) => {
                console.log('Done', user);
                this.setState({
                    message: `Welcome ${user.user_name}`,
                    errorMessage: ''
                })
            })
            .catch((err) => {
                console.log('Err', err);                
                this.setState({
                    errorMessage: 'Wrong password'
                })
            })
    }
    render() {
        const self = this;
        const {
            showControl,
            errorMessage
        } = self.state;
        const ControlCenter = () => {
            return (<div>
                <p>Welcome, admin</p>
                <ul>
                    <li><Link to="/admin/events">Manage Events</Link></li>
                </ul>
            </div>)
        }
        return (
        <div>
            <h1>Admin</h1>
            {
                showControl ? <ControlCenter /> :
                (<div className="form">
                    <div className="">Username</div>
                    <div><input type="text" onChange={self._setText.bind(null, 'username')}></input></div>

                    <div className="">Password</div>
                    <div><input type="password" onChange={self._setText.bind(null, 'password')}></input></div>

                    <div className=""><span className="text-danger">{errorMessage}</span></div>
                    <div className=""><button type="submit" onClick={self._login}>Submit</button></div>
                </div>)
            }
        </div>
        )
    }
}

export default Admin