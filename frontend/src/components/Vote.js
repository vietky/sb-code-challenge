import React, { Component } from 'react'

class Vote extends Component {
    constructor(props) {
        super(props)
        this._onClick = this._onClick.bind(this);
    }
    _onClick(liked) {
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
                liked === true ? (<button type="button" onClick={self._onClick.bind(self, false)}>Unlike</button>) :
                (<button type="button" onClick={self._onClick.bind(self, true)}>Like</button>)
            }
        </div>)
    }
}

export default Vote;