import request from './request';
import Cookies from 'cookies-js';

class UserService {
    login(username, password) {
        return request.post(`login`, {
            username,
            password
        }).then((user) => {
            Cookies.set('access_token', user.token, { expires: 60 * 30 }); // 30 minutes
            return Promise.resolve(user);
        });
    }
}

export default new UserService();