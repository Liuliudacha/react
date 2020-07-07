import request from '../utils/request';

export function work(params) {
    const data = params
    return request.get('/fleet/api/v1/pc/work', data)
}

export function binds(params) {
    const data = params
    return request.put('/fleet/api/v1/pc/work/binds', data)
}

export function bind(params) {
    const data = params
    return request.post('/fleet/api/v1/pc/work/binds', data)
}

export function batchBind(params) {
    const data = params
    return request.post('/fleet/api/v1/pc/work/binds/batch', data)
}

export function publish(id) {
    // const data = params
    return request.patch('/fleet/api/v1/pc/work/publish/add/' + id)
}

export function batchPublish(params) {
    const data = params
    return request.patch('/fleet/api/v1/pc/work/publish/batch', data)
}

export function freebus(params) {
    const data = params
    return request.get('/fleet/api/v1/pc/work/freebus', data)
}

export function driverbus(params) {
    const data = params
    return request.get('/fleet/api/v1/pc/work/driverbus', data)
}

export function dispatch(params) {
    const data = params
    return request.get('/fleet/api/v1/pc/work/dispatch', data)
}

export function login(params) {
    const data = params
    return request.post('/fleet/api/v1/pc/login', data)
}

export function unbind(id) {
    return request.put('/fleet/api/v1/pc/work/unbind/' + id)
}

export function info() {
    return request.get('/fleet/api/v1/pc/info')
}

export function code(data) {
    return request.post('/fleet/api/v1/pc/login/callback',data)
}

export function remark(id,data) {
    return request.post('/fleet/api/v1/pc/work/driver_remark/' + id, data)
}