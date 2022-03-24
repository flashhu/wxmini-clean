const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { LoginType } = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            // 限定长度 包含特殊字符
            new Rule('isLength', '密码长度需为6~32位', { min: 6, max: 32 }),
            new Rule('matches', '密码必需包含大小写字母和数字', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/)
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称长度需为4~32位', { min: 4, max: 32 })
        ]
    }

    // 校验密码一致
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2) {
            throw new Error('两次密码不一致')
        }
    }

    // 校验邮箱唯一
    // async validateEmail(vals) {
    //     const email = vals.body.email
    //     const user = await User.findOne({
    //         where: {
    //             email: email
    //         }
    //     })
    //     if(user) {
    //         throw new Error('email已存在')
    //     }
    // }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        // web => 账号 + 密码
        // 小程序 => 账号
        this.account = [
            new Rule('isLength', '账号长度不符规则', { min: 4, max: 32 })
        ]
        this.secret = [
            // 可为空
            new Rule('isOptional'),
            new Rule('isLength', '至少6位', { min: 6 })
        ]
    }

    validateLoginType(vals) {
        if(!vals.body.type) {
            throw new Error('type必须为参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class AddCaseValidator extends LinValidator {
    constructor() {
        super();
        this.name = [new Rule('isLength', '案例长度需为1~50位', { min: 1, max: 50 })];
        this.img = [new Rule('isLength', '链接长度需为1~100位', { min: 1, max: 100 })];
    }
}

class AddAddrValidator extends LinValidator {
    constructor() {
        super();
        this.name = [new Rule('isLength', '姓名长度需为1~20位', { min: 1, max: 20 })];
        this.phone = [new Rule('isMobilePhone', '请检查手机号格式', 'zh-CN')];
        this.addr = [new Rule('isLength', '地址长度需为1～50位', { min: 1, max: 50 })];
        this.isDefault = [
            // 可为空
            new Rule('isOptional'),
            new Rule('isInt', '请检查是否默认的传参类型', { min: 0, max: 1 })
        ];
    }
}

class UpdateAddrValidator extends LinValidator {
    constructor() {
        super();
        this.id = [ new Rule('isInt', '需要正整数', { min: 1 })];
        this.name = [new Rule('isOptional'), new Rule('isLength', '姓名长度需为1~20位', { min: 1, max: 20 })];
        this.phone = [new Rule('isOptional'), new Rule('isMobilePhone', '请检查手机号格式', 'zh-CN')];
        this.addr = [new Rule('isOptional'), new Rule('isLength', '地址长度需为1～50位', { min: 1, max: 50 })];
        this.isDefault = [new Rule('isOptional'), new Rule('isInt', '请检查是否默认的传参类型', { min: 0, max: 1 })];
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    AddCaseValidator,
    AddAddrValidator,
    UpdateAddrValidator
}