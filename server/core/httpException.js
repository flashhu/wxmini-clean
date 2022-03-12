class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.code = code
        this.errorCode = errorCode
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 10000
        this.msg = msg || '参数错误'
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.errorCode = errorCode || 0
        this.msg = msg || 'ok'
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.errorCode = errorCode || 10000
        this.msg = msg || '资源未找到'
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.errorCode = errorCode || 10004
        this.msg = msg || '授权失败'
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.errorCode = errorCode || 10006
        this.msg = msg || '禁止访问'
    }
}

class LikeError extends HttpException {
    constructor() {
        super()
        this.code = 400
        this.errorCode = 60001
        this.msg = '用户已点赞'
    }
}

class DislikeError extends HttpException {
    constructor() {
        super()
        this.code = 400
        this.errorCode = 60002
        this.msg = '用户未点赞'
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbidden,
    LikeError,
    DislikeError
}