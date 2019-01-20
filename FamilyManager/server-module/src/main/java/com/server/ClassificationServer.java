package com.server;

import com.pojo.Classification;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface ClassificationServer {


    /**
     * 添加数据
     * @param classification
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(Classification classification , String token) throws Exception;


    /**
     * 查询所有数据
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<Classification>> selectAll() throws Exception;


    /**
     * 修改数据
     * @param classification
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateData(Classification classification , String token) throws Exception;


    /**
     * 删除数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> deleteData(String id , String token) throws Exception;
}
