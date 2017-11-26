import request from './request';

class EventService {
    get() {
        return request.get(`admins/events`);
    }
    create(code, start, end) {
        return request.post(`admins/events`, {
            code,
            start,
            end
        });
    }
    put(code, start, end) {
        return request.put(`admins/events/${code}`, {
            start,
            end
        });
    }
}

export default new EventService();