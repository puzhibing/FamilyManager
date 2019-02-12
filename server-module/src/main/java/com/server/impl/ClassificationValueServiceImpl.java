package com.server.impl;

import com.dao.mapper.BusinessOrderMapper;
import com.dao.mapper.ClassificationValueMapper;
import com.pojo.BusinessOrder;
import com.pojo.ClassificationValue;
import com.server.ClassificationValueService;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class ClassificationValueServiceImpl implements ClassificationValueService {

    @Autowired
    private ClassificationValueMapper classificationValueMapper;

    @Autowired
    private BusinessOrderMapper businessOrderMapper;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<ClassificationValue>> resultBeanUtilList;

    private List<ClassificationValue> classificationValues;


    /**
     * 添加数据
     * @param classificationValue
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(ClassificationValue classificationValue, String token) throws Exception {
        classificationValue.setId(UUIDUtil.getUUID(20));
        classificationValue.setDel("0");
        classificationValue.setInsertTime(new Date());
        classificationValue.setInsertUserId("");
        try {
            classificationValueMapper.insertData(classificationValue);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * @param classificationValue
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> updateData(ClassificationValue classificationValue , String token) throws Exception {
        classificationValue.setUpdateTime(new Date());
        classificationValue.setUpdateUserId("");
        try {
            classificationValueMapper.updateData(classificationValue);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<ClassificationValue>> selectDataByClassification(String classification) throws Exception {
        try {
            classificationValues = classificationValueMapper.selectDataByClassification(classification);
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , classificationValues);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }


    /**
     * 删除数据
     * 删除数据之前先查询有无关联数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> deleteData(String id, String token) throws Exception {
        try {
            List<BusinessOrder> businessOrders = businessOrderMapper.selectDataByClassificationValue(id);
            if(0 == businessOrders.size()){
                classificationValueMapper.deleteData(id , "" , new Date());
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除成功" , true);
            }else {
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("有数据关联，无法进行删除操作。" , true);
            }
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }
}
