package com.server;

import com.pojo.Member;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface MemberServer {

    /**
     * 添加数据
     * @param member
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(Member member , String token) throws Exception;


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<Member>> selectDataByClassification(String classification) throws Exception;
}
