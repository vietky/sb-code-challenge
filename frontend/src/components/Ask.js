import React, { Component } from 'react'

class Ask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: ''
        }
        this._setText = this._setText.bind(this);
        this._onClick = this._onClick.bind(this);
    }
    _setText(fieldName, e) {
        const params = {};
        params[fieldName] = e.target.value;
        this.setState(params);
    }
    _onClick() {
        this.props.onClick({
            question: this.state.question
        })
    }
    render() {
        const self = this;
        return (
        <div className="ask-question-box">
            <input type="text" onChange={self._setText.bind(self, 'question')}></input>
            <button type="button" onClick={self._onClick}>Ask</button>
        </div>)
    }
}

export default Ask;