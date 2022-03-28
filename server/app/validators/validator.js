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
        this.is_default = [
            // 可为空
            new Rule('isOptional'),
            new Rule('isBoolean', '请检查是否默认的传参类型')
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
        this.is_default = [new Rule('isOptional'), new Rule('isBoolean', '请检查是否默认的传参类型')];
    }
}

class BuyGoodsValidator extends LinValidator {
    constructor() {
        super();
        this.address_id = [ new Rule('isInt', '请检查地址的传参', { min: 1 })];
        this.sum_price = [ new Rule('isInt', '请检查总价的传参', { min: 1 })];
    }

    validateLoginType(vals) {
        if(!vals.body.list) {
            throw new Error('请检查是否传递商品列表')
        }
        if (!Array.isArray(vals.body.list)) {
            throw new Error('请检查商品列表的类型')
        }
    }
}

class OrderServiceValidator extends LinValidator {
    constructor() {
        super();
        this.address_id = [ new Rule('isInt', '请检查地址的传参', { min: 1 })];
        this.type = [new Rule('isIn', '请检查服务类型的传参', ['s', 'c', 'g', 'm'])];
        this.area = [new Rule('isOptional'), new Rule('isNumeric', '请检查治理面积的传参')];
        this.point = [new Rule('isOptional'), new Rule('isInt', '请检查检测点位的传参', { min: 1 })];
        this.tech_type = [new Rule('isOptional'), new Rule('isInt', '请检查技术人员类型的传参', { min: 1 })];
        this.is_insure = [new Rule('isOptional'), new Rule('isBoolean', '请检查是否保险的传参')];
        this.date = [new Rule('isDate', '请检查预约时间的传参', { format: 'YYYY-MM-DD' })];
        this.sum_price = [new Rule('isNumeric', '请检查总价的传参')];
    }

    validateGovernType(vals) {
        const { type, area, point, tech_type, is_insure } = vals.body || {};
        if(['g', 'm'].includes(type) && !(area && tech_type && (is_insure !== undefined))) {
            throw new Error('请检查传参是否完整')
        }
        if(['s', 'c'].includes(type) && !point) {
            throw new Error('请检查传参是否完整')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    AddCaseValidator,
    AddAddrValidator,
    UpdateAddrValidator,
    BuyGoodsValidator,
    OrderServiceValidator
}