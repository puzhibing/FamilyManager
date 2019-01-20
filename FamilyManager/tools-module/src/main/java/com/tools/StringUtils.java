package com.tools;

public final class StringUtils {

    private static boolean b = false;

    private static String str;


    /**
     * 判断字符串（str != ''  str != 'null'  str != null）
     * @param str
     * @return
     */
    public static boolean isNotEmpty(String str){
        if(!StringUtils.isEmpty(str)){
            b = true;
        }
        return b;
    }


    /**
     * 判断字符串（str == ''  str == 'null'  str == null）
     * @param str
     * @return
     */
    public static boolean isEmpty(String str){
        StringUtils.str = str.trim();
        if(null == StringUtils.str || "".equals(StringUtils.str) || "null".equals(StringUtils.str)){
            b = true;
        }
        return b;
    }
}
