package com.webapi.controller;

import com.pojo.Member;
import com.server.MemberServer;
import com.tools.ResultBeanUtil;
import com.tools.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = "/Member")
public class MemberController {

    @Autowired
    private MemberServer memberServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Member>> resultBeanUtilList;


    /**
     * 添加数据
     * @param member
     * @param token
     * @return
     */
    @RequestMapping(value = "/insertData")
    public ResultBeanUtil<Object> insertData(Member member, String token){
        if(StringUtils.isNotEmpty(token) && null != member){
            try {
                resultBeanUtilObject = memberServerImpl.insertData(member , token);
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
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    @RequestMapping(value = "/selectDataByClassification")
    public ResultBeanUtil<List<Member>> selectDataByClassification(String classification){
        if(StringUtils.isNotEmpty(classification)){
            try {
                resultBeanUtilList = memberServerImpl.selectDataByClassification(classification);
            }catch (Exception e){
                resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("逻辑处理异常" , false);
            }
        }else {
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("参数异常" , false);
        }
        return resultBeanUtilList;
    }
}
