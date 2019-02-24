package com.dao.sql;

import com.pojo.Classification;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;

public class ClassificationSql {


    /**
     * 添加数据
     * @param classification
     * @return
     */
    public String insertData(Classification classification){
        return new SQL(){{
            INSERT_INTO("db_classification");
            INTO_COLUMNS("id , name , kind , type , accountType , sort , del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{name} , #{kind} , #{type} , #{accountType} , #{sort} , #{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 查询所有数据（升序排序）
     * @return
     */
    public String selectAll(){
        return new SQL(){{
            SELECT("id , name , kind , type , accountType , sort , del , insertUserId , insertTime , updateUserId , updateTime");
            FROM("db_classification");
            WHERE("del = '0'");
            ORDER_BY("sort");
        }}.toString();
    }


    /**
     * 修改数据
     * @param classification
     * @return
     */
    public String updateData(Classification classification){
        return new SQL(){{
            UPDATE("db_classification");
            SET("name = #{name} , accountType = #{accountType} , sort = #{sort} , updateUserId = #{updateUserId} , updateTime = #{updateTime}");
            WHERE("id = #{id} , del = '0'");
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
            UPDATE("db_classification");
            SET("del = '-1' , updateUserId = #{param2} , updateTime = #{param3}");
            WHERE("id = #{param1}");
        }}.toString();
    }


    /**
     * 根据种类id查询数据
     * @param kind
     * @return
     */
    public String selectDataByKind(String kind){
        return new SQL(){{
            SELECT("id , name , kind , type , accountType , sort");
            FROM("db_classification");
            WHERE("del = '0' and kind = #{kind}");
            ORDER_BY("sort");
        }}.toString();
    }
}
