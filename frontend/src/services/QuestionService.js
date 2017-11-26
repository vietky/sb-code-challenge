import request from './request';

class QuestionService {
    get(eventCode, sortBy = 'created_date', asc = 1) {
        return request.get(`audiences/events/${eventCode}?order_by=${sortBy}&ascending=${asc}`);
    }
    create(eventCode, description) {
        return request.post(`audiences/events/${eventCode}/questions`, {
            description
        });
    }
    vote(eventCode, questionId) {
        return request.put(`audiences/events/${eventCode}/questions/${questionId}/vote`);
    }
}

export default new QuestionService();