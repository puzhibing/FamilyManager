package com.dao.mapper;

import com.dao.sql.MemberSql;
import com.pojo.Member;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

public interface MemberMapper {

    /**
     * 添加数据
     * @param member
     */
    @InsertProvider(type = MemberSql.class , method = "insertData")
    void insertData(Member member);


    /**
     *
     * @param classification
     * @return
     */
    @SelectProvider(type = MemberSql.class , method = "selectDataByClassification")
    List<Member> selectDataByClassification(String classification);
}
