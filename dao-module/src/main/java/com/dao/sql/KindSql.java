package com.dao.sql;

import com.pojo.Kind;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;

public class KindSql {


    /**
     * 添加数据
     * @param kind
     * @return
     */
    public String insertData(Kind kind){
        return new SQL(){{
            INSERT_INTO("db_kind");
            INTO_COLUMNS("id , name , sort , del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{name} , #{sort} , #{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 修改数据
     * @param kind
     * @return
     */
    public String updateData(Kind kind){
        return new SQL(){{
            UPDATE("db_kind");
            SET("name = #{name} , sort = #{sort} , updateUserId = #{updateUserId} , updateTime = #{updateTime}");
            WHERE("id = #{id}");
        }}.toString();
    }


    /**
     * 查询所有数据
     * @return
     */
    public String selectAll(){
        return new SQL(){{
            SELECT("id , name , sort");
            FROM("db_kind");
            WHERE("del = '0'");
            ORDER_BY("sort");
        }}.toString();
    }


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     * @return
     */
    public String deleteData(String id , String updateUserId , Date updateTime){
        return new SQL(){{
            UPDATE("db_kind");
            SET("del = '-1' , updateUserId = #{param2} , updateTime = #{param3}");
            WHERE("id = #{param1}");
        }}.toString();
    }
}
