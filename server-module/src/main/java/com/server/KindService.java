package com.server;

import com.pojo.Kind;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface KindService {

    /**
     * 添加数据
     * @param kind
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(Kind kind , String token) throws Exception;


    /**
     * 修改数据
     * @param kind
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateData(Kind kind , String token) throws Exception;


    /**
     * 删除数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> deleteData(String id , String token) throws Exception;


    /**
     * 查询所有数据
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<Kind>> selectAll() throws Exception;
}
