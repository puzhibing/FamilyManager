package com.webapi.controller;


import com.pojo.Kind;
import com.server.KindService;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/Kind")
public class KindController {

    @Autowired
    private KindService kindServiceImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Kind>> resultBeanUtilList;


    /**
     * 添加数据
     * @param kind
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(Kind kind , String token){
        if(StringUtils.isNotEmpty(token) && null != kind){
            try {
                resultBeanUtilObject = kindServiceImpl.insertData(kind , token);
            }catch (Exception e){
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
     * @param kind
     * @param token
     * @return
     */
    @RequestMapping(value = "/updateData")
    public ResultBeanUtil<Object> updateData(Kind kind , String token){
        if(StringUtils.isNotEmpty(token) && null != kind){
            try {
                resultBeanUtilObject = kindServiceImpl.updateData(kind , token);
            }catch (Exception e){
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
    public ResultBeanUtil<Object> deleteData(String id , String token){
        if(StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(token)){
            try {
                resultBeanUtilObject = kindServiceImpl.deleteData(id , token);
            }catch (Exception e){
                e.printStackTrace();
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 查询所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll")
    public ResultBeanUtil<List<Kind>> selectAll(){
        try {
            resultBeanUtilList = kindServiceImpl.selectAll();
        }catch (Exception e){
            e.printStackTrace();
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
        }
        return resultBeanUtilList;
    }
}
