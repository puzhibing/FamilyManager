package com.tools;

/**
 * 定义统一返回的结果工具类
 */
public final class ResultBeanUtil<T> {

    private String msg;//返回信息

    private boolean b = false;//结果状态

    private T result;//结果集

    private Integer currentPage;//当前页

    private Integer totalPage;//总页数

    private Integer total;//数据总条数

    private ResultBeanUtil(){};

    private ResultBeanUtil(String msg , boolean b , T result , Integer currentPage
            , Integer totalPage , Integer total){
        this.msg = msg;
        this.b = b;
        this.result = result;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.total = total;
    }

    public String getMsg() {
        return msg;
    }

    public boolean getB() {
        return b;
    }

    public T getResult() {
        return result;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public Integer getTotal() {
        return total;
    }

    @Override
    public String toString() {
        return "ResultBeanUtil{" +
                "msg='" + msg + '\'' +
                ", b=" + b +
                ", result=" + result +
                ", currentPage=" + currentPage +
                ", totalPage=" + totalPage +
                ", total=" + total +
                '}';
    }

    /**
     * 定义统一对象的调用方法获取返回结果对象
     * @param msg 返回提示信息
     * @param b 返回结果状态
     * @param result 返回的结果内容
     * @param currentPage 当前页数
     * @param totalPage 总页数
     * @param total 返回内容总条数
     * @return
     */
    public static ResultBeanUtil getResultBeanUtil(String msg , boolean b , Object result , Integer currentPage
            , Integer totalPage , Integer total){
        return new ResultBeanUtil(msg , b , result , currentPage , totalPage , total);
    }


    /**
     * 简化版的返回结果对象
     * @param msg 返回提示信息
     * @param b 返回结果状态
     * @param result 返回的结果内容
     * @return
     */
    public static ResultBeanUtil getResultBeanUtil(String msg , boolean b , Object result){
        return ResultBeanUtil.getResultBeanUtil(msg , b , result , -1 , -1 , -1);
    }


    /**
     * 基础班返回结果对象
     * @param msg 返回提示信息
     * @param b 返回结果状态
     * @return
     */
    public static ResultBeanUtil getResultBeanUtil(String msg , boolean b){
        return ResultBeanUtil.getResultBeanUtil(msg , b , null);
    }

}
