package com.dao.sql;

import com.pojo.ClassificationValue;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;

public class ClassificationValueSql {

    /**
     * 添加数据
     * @param classificationValue
     * @return
     */
    public String insertData(ClassificationValue classificationValue){
        return new SQL(){{
            INSERT_INTO("db_classification_value");
            INTO_COLUMNS("id , classification , name , sort");
            INTO_COLUMNS("del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{classification} , #{name} , #{sort}");
            INTO_VALUES("#{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 修改数据
     * @param classificationValue
     * @return
     */
    public String updateData(ClassificationValue classificationValue){
        return new SQL(){{
            UPDATE("db_classification_value");
            SET("name = #{name} , sort = #{sort}");
            SET("updateUserId = #{updateUserId} , updateTime = #{updateTime}");
            WHERE("id = #{id} and del = '0'");
        }}.toString();
    }



    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    public String selectDataByClassification(String classification){
        return new SQL(){{
            SELECT("id , classification , name , sort");
            FROM("db_classification_value");
            WHERE("classification = #{classification} and del = '0'");
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
            UPDATE("db_classification_value");
            SET("del = '-1' , updateUserId = #{param2} , updateTime = #{param3}");
            WHERE("id = #{param1}");
        }}.toString();
    }
}
