package com.webapi.controller;

import com.pojo.ContactsAccount;
import com.server.ContactsAccountServer;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/ContactsAccount")
public class ContactsAccountController {

    @Autowired
    private ContactsAccountServer contactsAccountServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<ContactsAccount>> resultBeanUtilList;


    /**
     * 添加数据
     * @param contactsAccount
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(ContactsAccount contactsAccount , String token){
        if(StringUtils.isNotEmpty(token) && null != contactsAccount){
            try {
                resultBeanUtilObject = contactsAccountServerImpl.insertData(contactsAccount , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" ,false);
            }
        }else{
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" ,false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * @param contactsAccount
     * @param token
     * @return
     */
    @RequestMapping(value = "/updateData")
    public ResultBeanUtil<Object> updateData(ContactsAccount contactsAccount, String token){
        if(StringUtils.isNotEmpty(token) && null != contactsAccount){
            try {
                resultBeanUtilObject = contactsAccountServerImpl.updateData(contactsAccount , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" ,false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" ,false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    @RequestMapping(value = "/selectDataByClassification")
    public ResultBeanUtil<List<ContactsAccount>> selectDataByClassification(String classification){
        if(StringUtils.isNotEmpty(classification)){
            try {
                resultBeanUtilList = contactsAccountServerImpl.selectDataByClassification(classification);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false , null);
            }
        }else{
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("参数异常" , false , null);
        }
        return resultBeanUtilList;
    }


    /**
     * 删除数据
     * @param id
     * @param token
     * @return
     */
    @RequestMapping(value = "/deleteData")
    public ResultBeanUtil<Object> deleteData(String id, String token){
        if(StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(token)){
            try {
                resultBeanUtilObject = contactsAccountServerImpl.deleteData(id , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" ,false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" ,false);
        }
        return resultBeanUtilObject;
    }
}
