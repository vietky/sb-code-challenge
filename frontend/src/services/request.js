import request from 'request';
import Cookies from 'cookies-js';

const getDefaultHeader = () => {
    const token = Cookies.get('access_token') || '';    
    return {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
    }
}

class Request {
    constructor(host) {
        this.host = host;
    }
    get(url) {
        return new Promise((resolve, reject) => {
            return request({
                method: 'GET',
                url: `${this.host}${url}`,
                headers: getDefaultHeader()
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    return resolve(info);
                }
                return reject(error || body)
            })
        })
    }
    post(url, body = {}) {
        return new Promise((resolve, reject) => {
             request({
                method: 'POST',
                url: `${this.host}${url}`,
                headers: getDefaultHeader(),
                body: JSON.stringify(body)
            }, (error, response, body) => {
                var info = JSON.parse(body);
                if (!error && response.statusCode === 200) {
                    return resolve(info);
                }
                return reject(error || info)
            })
        })
    }
    put(url, body = {}) {
        return new Promise((resolve, reject) => {
            return request({
                method: 'PUT',
                url: `${this.host}${url}`,
                headers: getDefaultHeader(),                
                body: JSON.stringify(body)
            }, (error, response, body) => {
                var info = JSON.parse(body);
                if (!error && response.statusCode === 200) {
                    return resolve(info);
                }
                return reject(error || info)
            })
        })
    }
    delete(url) {
        return new Promise((resolve, reject) => {
            return request({
                method: 'DELETE',
                url: `${this.host}${url}`,
                headers: getDefaultHeader()                
            }, (error, response, body) => {
                var info = JSON.parse(body);
                if (!error && response.statusCode === 200) {
                    return resolve(info);
                }
                return reject(error || info)
            })
        })
    }
}

export default new Request(`http://localhost:8080/`);