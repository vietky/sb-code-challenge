import React, { Component } from 'react'
import {
    QuestionService
} from '../services';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventCode: '',
            errorMessage: ''
        }
        this._setText = this._setText.bind(this);
        this._checkEvent = this._checkEvent.bind(this);
    }
    _setText(fieldName, e) {
        const params = {};
        params[fieldName] = e.target.value;
        this.setState(params);
    }
    _checkEvent() {
        const {
            eventCode
        } = this.state;
        const self = this;
        // should send a HEAD request is enough
        QuestionService.get(eventCode, '', 0)
            .then((results) => {
                if (results) {
                    self.props.history.push(`/audience/${eventCode}?sort_by=likes&asc=0`)
                }
                else {
                    this.setState({
                        errorMessage: `Wrong event code`
                    })
                }
            })
    }
    render() {
        const self = this;
        const {
            errorMessage
        } = self.state;
        return (
        <div>
            <h1>Home</h1>
            <div className="">Input your event code here</div>
            <div className=""><input type="text" onChange={self._setText.bind(null, 'eventCode')}></input></div>
            <div className=""><span className="text-danger">{errorMessage}</span></div>
            <div className=""><button type="submit" onClick={self._checkEvent}>Join</button></div>
        </div>
        )
    }
}

export default Home