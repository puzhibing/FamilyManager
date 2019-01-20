package com.server;

import com.pojo.BusinessOrder;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface BusinessOrderServer {


    /**
     * 添加数据
     * 添加数据的同时需要修改对应账户的值
     * @param businessOrder
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(BusinessOrder businessOrder , String token) throws Exception;


    /**
     * 修改数据
     * 修改数据之前需要还原之前对应账户的值
     * 然后再修改对应新账户的值
     * @param businessOrder
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateData(BusinessOrder businessOrder , String token) throws Exception;


    /**
     * 查询所有数据（对单据日期进行降序排序，实现分页）
     * @param page 查询的页数，第一页从1开始
     * @param size 每页查询的条数
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<BusinessOrder>> selectAll(Integer page , Integer size) throws Exception;


    /**
     * 删除数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> deleteData(String id , String token) throws Exception;
}
