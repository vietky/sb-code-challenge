import _ from 'lodash';
import React, { Component } from 'react';
import { Ask, Vote } from '../components'
import {
    QuestionService
} from '../services';
import queryString from 'query-string';

class Audience extends Component {
    constructor(props) {
        super(props)
        const eventCode = props.match.params.eventCode;
        const parsed = queryString.parse(props.location.search);

        this.state = {
            eventCode,
            sortBy: parsed.sort_by ? '' : parsed.sort_by,
            asc: parsed.asc === '1' ? 1 : 0,
            event: null,
            questions: [],
            errorMessage: ''
        }
        this._load = this._load.bind(this);
        this._setOrderParams = this._setOrderParams.bind(this);
        this._voteQuestion = this._voteQuestion.bind(this);
    }
    componentDidMount() {
        this._load()
    }
    _load() {
        const {
            eventCode,
            sortBy,
            asc
        } = this.state;
        QuestionService.get(eventCode, sortBy, asc)
            .then((event) => {
                this.setState({
                    event: event,
                    questions: event.questions,
                    errorMessage: ''
                })
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.messsage
                })
            })
    }
    _askQuestion(data) {
        const {
            eventCode
        } = this.state;
        const self = this;
        QuestionService.create(eventCode, data.question)
            .then(() => {
                self._load();
            })
    }
    _setOrderParams(fieldName, value, e) {
        e.preventDefault();
        const self = this;
        const params = {};
        params[fieldName] = value;
        this.setState(params, () => {
            self._load();
        });
    }
    _voteQuestion(questionId) {
        const {
            eventCode
        } = this.state;
        const self = this;
        QuestionService.vote(eventCode, questionId)
            .then(() => {
                self._load();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.message
                })
            })
    }
    render() {
        const self = this;

        const Question = ({ question }) => {
            const {
                id,
                user_id,
                is_highlighted,
                created_date,
                description,
                liked
            } = question;
            const name = user_id === -1 ? "Anonymous" : `Unknown ${user_id}`
            return (
                <div className={`question ${is_highlighted ? 'highlighted' : ''}`}>
                    <div className="avatar"></div>
                    <div className="name">{name}</div>
                    <div className="date">{created_date}</div>
                    <div className="description">{description}</div>
                    <div className="action">
                        <Vote liked={liked} onClick={self._voteQuestion.bind(self, id)}/>
                    </div>
                </div>
            )
        }

        const {
            sortBy,
            asc,
            event,
            questions,
            errorMessage
        } = self.state;

        if (!event) {
            return (
                <p className="text-info">
                    Rendering...
                </p>
            )
        }
        const nextSortByValue = sortBy === 'created_date' ? 'likes' : 'created_date';
        const nextAscValue = asc === '1' ? '0' : '1';
        return (
            <div>
            { errorMessage.length > 0 ? (<p className="text-danger">{errorMessage}</p>) : '' }
            <div>
                <h3>Event Code: {event.code}</h3>
                <Ask onClick={self._askQuestion.bind(self)} />
                <div>
                <span className="text-muted">
                    Order by &nbsp;
                    <a href="" onClick={self._setOrderParams.bind(self, 'sortBy', nextSortByValue)}>{sortBy==='created_date'? 'Created' :'Popular'}</a>&nbsp;
                    <a href="" onClick={self._setOrderParams.bind(self, 'asc', nextAscValue)}>{asc==='1'?'Ascending':'Descending'}</a>
                </span>
                </div>
                <p className="text-info">{questions.length} questions</p>
                <div className="questions">
                    {
                        _.map(questions, (question, index) => {
                            return (<Question key={index} question={question}></Question>);
                        })
                    }
                </div>
            </div>
            </div>
        )
    }
}

export default Audience