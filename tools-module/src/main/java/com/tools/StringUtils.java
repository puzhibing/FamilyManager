package com.tools;

public final class StringUtils {

    private static boolean b;

    private static String str;


    /**
     * 判断字符串（str != ''  str != 'null'  str != null）
     * @param str
     * @return
     */
    public static boolean isNotEmpty(String str){
        if(StringUtils.isEmpty(str)){
            return !StringUtils.b;
        }
        return !StringUtils.b;
    }


    /**
     * 判断字符串（str == ''  str == 'null'  str == null）
     * @param str
     * @return
     */
    public static boolean isEmpty(String str){
        StringUtils.b = false;
        StringUtils.str = str;
        if(null != StringUtils.str){
            StringUtils.str = StringUtils.str.trim();
        }
        if(null == StringUtils.str || "".equals(StringUtils.str) || "null".equals(StringUtils.str)){
            StringUtils.b = true;
        }
        return StringUtils.b;
    }
}
