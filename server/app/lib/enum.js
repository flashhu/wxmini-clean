function isThisType(val) {
    for(let key in this) {
        if(this[key] === val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    ADMIN_NAME: 200,
    isThisType
}

const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}