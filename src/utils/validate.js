
/**
 * 
 * @param {string} str 传入参数
 * @return {boolean} 返回 验证是否带有特殊符号
 */
export function stripscript(str){
    var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;  
    return pattern.test(str)
}


/**
 * 
 * @param {string} str 传入参数
 * @return {boolean} 返回 验证是否符合邮箱规则
 */
export function validateEmail(str){
    let pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return pattern.test(str)
}