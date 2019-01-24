package com.webapi.controller;


import com.pojo.Classification;
import com.server.ClassificationServer;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController(value = "/Classification")
public class ClassificationController {

    @Autowired
    private ClassificationServer classificationServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Classification>> resultBeanUtilList;


    /**
     * 添加数据
     * @param classification
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(Classification classification, String token){
        if(StringUtils.isNotEmpty(token) && null != classification){
            try {
                resultBeanUtilObject = classificationServerImpl.insertData(classification , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else{
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据种类id查询数据
     * @param kind
     * @return
     */
    @RequestMapping(value = "/selectDataByKind")
    public ResultBeanUtil<List<Classification>> selectDataByKind(String kind){
        if(StringUtils.isNotEmpty(kind)){
            try {
                resultBeanUtilList = classificationServerImpl.selectDataByKind(kind);
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
     * 修改数据
     * @param classification
     * @param token
     * @return
     */
    @RequestMapping(value = "/updateData")
    public ResultBeanUtil<Object> updateData(Classification classification, String token){
        if(StringUtils.isNotEmpty(token) && null != classification){
            try {
                resultBeanUtilObject = classificationServerImpl.updateData(classification , token);
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
     * 删除数据
     * @param id
     * @param token
     * @return
     */
    @RequestMapping(value = "/deleteData")
    public ResultBeanUtil<Object> deleteData(String id, String token){
        if(StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(token)){
            try {
                resultBeanUtilObject = classificationServerImpl.deleteData(id , token);
            } catch (Exception e) {
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }
}
