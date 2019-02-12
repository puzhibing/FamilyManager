/**
 * 获取给定日期对象的字符串表达
 * @param format 格式化的日期格式‘yyyy-MM-dd hh:mm:ss’，‘yyyy-MM-dd’
 * @param date 给定的Date()对象
 */
function formatDate(format , date){
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(format)){
        format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return format;
}


/**
 * 将<input type="datetime-local">类型的日期控件值转换为Date()对象
 * @param datetimeLocal
 */
function getDateForDatetimeLocal(datetimeLocal){
    var date = new Date();
    date.setFullYear(parseInt(datetimeLocal.substring(0 , 4)));
    date.setMonth(parseInt(datetimeLocal.substring(5, 7)) - 1);
    date.setDate(parseInt(datetimeLocal.substring(8, 10)));
    date.setHours(parseInt(datetimeLocal.substring(11, 13)));
    date.setMinutes(parseInt(datetimeLocal.substring(14, 16)));
    return date;
}


/**
 * 解析后台传到前端的Date类型，格式化字符串类型
 * @param date
 * @returns {void | string | *}
 */
function getDateString(date){
    var d = new Date(date);
    return formatDate("yyyy-MM-dd hh:mm:ss" , d);
}


/**
 * 获取给定月的天数
 * @param year
 * @param month
 * @returns {number}
 */
function getMonthDays(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}