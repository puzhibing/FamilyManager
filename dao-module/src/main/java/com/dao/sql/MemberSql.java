package com.dao.sql;

import com.pojo.Member;
import org.apache.ibatis.jdbc.SQL;

public class MemberSql {


    /**
     * 添加数据
     * @param member
     * @return
     */
    public String insertData(Member member){
        return new SQL(){{
            INSERT_INTO("db_member");
            INTO_COLUMNS("id , classification , name , balance , sort");
            INTO_COLUMNS("del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{classification} , #{name} , #{balance} , #{sort}");
            INTO_VALUES("#{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    public String selectDataByClassification(String classification){
        return new SQL(){{
            SELECT("id , classification , name , balance , sort");
            FROM("db_member");
            WHERE("del = '0' and classification = #{classification}");
            ORDER_BY("sort");
        }}.toString();
    }
}
