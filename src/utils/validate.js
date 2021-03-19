export const number_reg = /^([1-9][0-9]*)$/
export const number_reg_msg = '请输入大于0的整数'
export const number_reg1 = /^([1-9]\d*|[0]{1,1})$/
export const number_reg1_msg = '请输入大于等于0的整数'
export const number_reg2 = /^(\d|[1-9]\d+)(\.\d+)?$/
export const number_reg2_msg = '请输入大于等于0的数字'
export const number_reg3 = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
export const number_reg3_msg = '请输入大于0的数字'
export const number_reg4 = /((^0.0[1-9]$)|(^0.[1-9]{1,2}$)|(^0.[1-9]\d$))|(^[1-9]+[\d]*(.[0-9]{1,2})?$)/
export const number_reg4_msg = '请输入大于0的数字，最多两位小数'

export const url_reg = /^(https?):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
export const url_reg_msg = '请输入url地址'

export const email_reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@(([0-9A-Za-z]+\.){1,2})([A-Za-z]+)$/
export const email_reg_msg = '请输入正确的邮箱'

export const account_reg = /^[a-zA-Z0-9]{3,20}$/
export const account_reg_msg = '账号只能包括字母，数字，长度3-20位'

export const phone_reg = /^1[0-9]{10}$/
export const phone_reg_msg = '请输入正确的11位手机号'

export const password_reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/
export const password_reg_msg = '密码包含 数字,英文,字符中的两种以上，长度6-20'

export const idCard_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export const idCard_reg_msg = '请输入合法的身份证号'
