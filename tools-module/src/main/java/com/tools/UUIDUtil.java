package com.tools;

import java.util.UUID;

public final class UUIDUtil {

    private static String uuidStr = "";

    private static int def = 32;

    /**
     * 获取不含分隔符的UUID随机32位字符串
     * @return
     */
    private static String getUUID(){
        uuidStr = UUID.randomUUID().toString();
        return uuidStr.replaceAll("-" , "");
    }


    /**
     * 获取指定位数的UUID随机字符串
     * @param num
     * @return
     */
    public static String getUUID(int num) throws Exception{
        if(num > 0 ){
            return UUIDUtil.splice(num);
        }else{
            throw new Exception("传入参数非法，必须为大于0的整数值！");
        }
    }


    /**
     * 处理拼接逻辑
     * @param num > 0
     * @return
     */
    private static String splice(int num){
        if(num > def){
            int remainder = num % def;
            int total = num / def;
            for (int i = 0 ; i < total ; i++){
                uuidStr += UUIDUtil.getUUID();
            }
            return uuidStr + UUIDUtil.getUUID().substring(0 , remainder);
        }else{
            return UUIDUtil.getUUID().substring(0 , num);
        }
    }
}
