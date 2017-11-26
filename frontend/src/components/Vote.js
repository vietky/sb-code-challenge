import React, { Component } from 'react'

class Vote extends Component {
    constructor(props) {
        super(props)
        this._onClick = this._onClick.bind(this);
    }
    _onClick(liked, e) {
        e.preventDefault();
        this.props.onClick({
            liked
        })
    }
    render() {
        const self = this;
        const {
            liked
        } = self.props;
        return (
        <div className="vote-button">
            {
                liked === true ? (<a href="" onClick={self._onClick.bind(self, false)}>Unlike</a>) :
                (<a href="" onClick={self._onClick.bind(self, true)}>Like</a>)
            }
        </div>)
    }
}

export default Vote;