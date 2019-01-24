package com.server;

import com.pojo.ClassificationValue;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface ClassificationValueService {


    /**
     * 添加数据
     * @param classificationValue
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(ClassificationValue classificationValue , String token) throws Exception;


    /**
     * 修改数据
     * @param classificationValue
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateData(ClassificationValue classificationValue , String token)throws Exception;


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<ClassificationValue>> selectDataByClassification(String classification) throws Exception;


    /**
     * 删除数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> deleteData(String id , String token) throws Exception;
}
