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
     * 根据种类id查询数据
     * @param kind
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<Classification>> selectDataByKind(String kind) throws Exception;


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
