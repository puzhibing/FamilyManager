package com.server.impl;

import com.dao.mapper.ClassificationMapper;
import com.dao.mapper.ContactsAccountMapper;
import com.pojo.Classification;
import com.pojo.ContactsAccount;
import com.server.ClassificationServer;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class ClassificationServerImpl implements ClassificationServer {

    @Autowired
    private ClassificationMapper classificationMapper;

    @Autowired
    private ContactsAccountMapper contactsAccountMapper;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Classification>> resultBeanUtilList;

    private List<Classification> classifications;


    /**
     * 添加数据
     * @param classification
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(Classification classification, String token) throws Exception {
        classification.setId(UUIDUtil.getUUID(20));
        classification.setDel("0");
        classification.setInsertTime(new Date());
        classification.setInsertUserId("");
        try{
            classificationMapper.insertData(classification);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据种类id查询数据
     * @param kind
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<Classification>> selectDataByKind(String kind) throws Exception {
        try {
            classifications = classificationMapper.selectDataByKind(kind);
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , classifications);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }


    /**
     * 修改数据
     * @param classification
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> updateData(Classification classification, String token) throws Exception {
        classification.setUpdateTime(new Date());
        classification.setUpdateUserId("");
        try{
            classificationMapper.updateData(classification);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 删除数据
     * 删除之前需验证是否有关联数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> deleteData(String id, String token) throws Exception {
        try {
            List<ContactsAccount> contactsAccounts = contactsAccountMapper.selectDataByClassification(id);
            if(null != contactsAccounts && contactsAccounts.size() > 0){
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("有数据关联，无法进行删除操作。" , true);
            }else{
                classificationMapper.deleteData(id , "" , new Date());
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除成功" , true);
            }
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }
}
