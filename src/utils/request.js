import axios from 'axios';
import { message } from 'antd'

const service = axios.create({
    baseURL:'http://dev211.api.fleet.webus.vip:12321', 
    timeout: 50000 ,// 请求超时时间
})

service.interceptors.request.use(config => {
    config.headers['Authorization'] = sessionStorage.getItem('token');
    return config;
}, error => {
    Promise.reject(error);
})

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        }else if(response.status === 401){
            this.$router.replace('/login');
        }
    },
    (error) => {
        if(error.response.status === 500){
            message.error( '网络错误' , 500);
        }
        return Promise.reject(error);
})
  
  

var formatUrl = (url, data) => {
    if (!data) return url;
    if (typeof (data) === "string") {
        return url + data;
    }
    if (typeof (data) === "object") {
        for (var key in data) {
            var value = data[key];
            if (value === null) continue;
            var mark = "{" + key + "}";
            if (url.indexOf(mark) === -1) continue;
            url = url.replace(mark, value);
        }
        return url;
    }
    return url;
};

var request = (resource, query, data, method) => {
    resource = formatUrl(resource, query);
    return service({
        url: resource,
        method: method,
        data,
        params: query,
    });
};
  
service.get = (resource, query) => {
    return request(resource, query, null, "get");
}
service.post = (resource, data, query) => {
    return request(resource, query, data, "post");
}
service.put = (resource, data, query) => {
    return request(resource, query, data, "put");
}
service.patch = (resource, data, query) => {
    return request(resource, query, data, "patch");
}
  
export default service;
