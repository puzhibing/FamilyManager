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
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
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
     * 查询所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll")
    public ResultBeanUtil<List<Classification>> selectAll(){
        try {
            resultBeanUtilList = classificationServerImpl.selectAll();
        }catch (Exception e){
            e.printStackTrace();
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false , null);
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
