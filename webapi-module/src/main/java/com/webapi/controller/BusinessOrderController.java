package com.webapi.controller;


import com.pojo.BusinessOrder;
import com.server.BusinessOrderServer;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController(value = "/BusinessOrder")
public class BusinessOrderController {

    @Autowired
    private BusinessOrderServer businessOrderServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<BusinessOrder>> resultBeanUtilList;


    /**
     * 添加数据
     * @param businessOrder
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(BusinessOrder businessOrder , String token){
        if(StringUtils.isNotEmpty(token) && null != businessOrder){
            try {
                resultBeanUtilObject = businessOrderServerImpl.insertData(businessOrder , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * @param businessOrder
     * @param token
     * @return
     */
    @RequestMapping(value = "/updateData")
    public ResultBeanUtil<Object> updateData(BusinessOrder businessOrder , String token){
        if(StringUtils.isNotEmpty(token) && null != businessOrder){
            try {
                resultBeanUtilObject = businessOrderServerImpl.updateData(businessOrder , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 查询所有数据（分页）
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(value = "/selectAll")
    public ResultBeanUtil<List<BusinessOrder>> selectAll(Integer page , Integer size){
        if(0 < page && 0 < size){
            try {
                resultBeanUtilList = businessOrderServerImpl.selectAll(page , size);
            }catch (Exception e){
                e.printStackTrace();
                resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
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
    public ResultBeanUtil<Object> deleteData(String id , String token){
        if (StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(token)){
            try {
                resultBeanUtilObject = businessOrderServerImpl.deleteData(id , token);
            }catch (Exception e){
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }
}
