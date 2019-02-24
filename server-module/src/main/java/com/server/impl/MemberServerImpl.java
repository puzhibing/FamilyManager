package com.server.impl;

import com.dao.mapper.MemberMapper;
import com.pojo.Member;
import com.server.MemberServer;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class MemberServerImpl implements MemberServer {

    @Autowired
    private MemberMapper memberMapper;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Member>> resultBeanUtilList;

    private List<Member> memberList;

    @Override
    public ResultBeanUtil<Object> insertData(Member member, String token) throws Exception {
        member.setId(UUIDUtil.getUUID(20));
        member.setDel("0");
        member.setInsertTime(new Date());
        try {
            memberMapper.insertData(member);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
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
    public ResultBeanUtil<List<Member>> selectDataByClassification(String classification) throws Exception {
        try {
            memberList = memberMapper.selectDataByClassification(classification);
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , memberList);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }
}
