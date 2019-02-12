package com.webapi.controller;


import com.pojo.ClassificationValue;
import com.server.ClassificationValueService;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/ClassificationValue")
public class ClassificationValueController {

    @Autowired
    private ClassificationValueService classificationValueServiceImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<ClassificationValue>> resultBeanUtilList;


    /**
     * 添加数据
     * @param classificationValue
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(ClassificationValue classificationValue , String token){
        if(StringUtils.isNotEmpty(token) && null != classificationValue){
            try {
                resultBeanUtilObject = classificationValueServiceImpl.insertData(classificationValue , token);
            }catch (Exception e){
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * @param classificationValue
     * @param token
     * @return
     */
    @RequestMapping(value = "/updateData")
    public ResultBeanUtil<Object> updateData(ClassificationValue classificationValue , String token){
        if(StringUtils.isNotEmpty(token) && null != classificationValue){
            try {
                resultBeanUtilObject = classificationValueServiceImpl.updateData(classificationValue , token);
            }catch (Exception e){
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    @RequestMapping(value = "/selectDataByClassification")
    public ResultBeanUtil<List<ClassificationValue>> selectDataByClassification(String classification){
        if(StringUtils.isNotEmpty(classification)){
            try {
                resultBeanUtilList = classificationValueServiceImpl.selectDataByClassification(classification);
            }catch (Exception e){
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
        if(StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(token)){
            try {
                resultBeanUtilObject = classificationValueServiceImpl.deleteData(id , token);
            }catch (Exception e){
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }
}
