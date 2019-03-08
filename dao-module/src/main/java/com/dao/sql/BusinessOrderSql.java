package com.dao.sql;

import com.pojo.BusinessOrder;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;

public class BusinessOrderSql {


    /**
     * 添加数据
     * @param businessOrder
     * @return
     */
    public String insertData(BusinessOrder businessOrder){
        return new SQL(){{
            INSERT_INTO("db_business_order");
            INTO_COLUMNS("id , documentDate , documentNumber , documentType , businessType , income , expenditure , amount , contacts , classificationValue , handMan");
            INTO_COLUMNS("remark , del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{documentDate} , #{documentNumber} , #{documentType} , #{businessType} , #{income} , #{expenditure} , #{amount} , #{contacts} , #{classificationValue} , #{handMan}");
            INTO_VALUES("#{remark} , #{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 修改数据
     * @param businessOrder
     * @return
     */
    public String updateData(BusinessOrder businessOrder){
        return new SQL(){{
            UPDATE("db_business_order");
            SET("income = #{income} , expenditure = #{expenditure} , amount = #{amount} , contacts = #{contacts} , classificationValue = #{classificationValue} , handMan = #{handMan}");
            SET("remark = #{remark} , updateUserId = #{updateUserId} , updateTime = #{updateTime}");
            WHERE("id = #{id}");
        }}.toString();
    }


    /**
     * 查询所有数据（按单据时间进行降序排序，实现分页）
     * @return
     */
    public String selectAll(Integer start , Integer size){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType , businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0'");
            ORDER_BY("documentDate desc limit #{param1},#{param2}");
        }}.toString();
    }


    /**
     * 查询所有数据总和
     * @return
     */
    public String selectAllCount(){
        return new SQL(){{
            SELECT("count(id)");
            FROM("db_business_order");
            WHERE("del = '0'");
        }}.toString();
    }


    /**
     * 查询单据中（income/expenditure）字段包含给定id的数据
     * @param id
     * @return
     */
    public String selectDataByIncomeOrExpenditure(String id){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType , businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0' and income = #{id} or expenditure = #{id}");
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
            UPDATE("db_business_order");
            SET("del = '-1' , updateUserId = #{param2} , updateTime = #{param3}");
            WHERE("id = #{param1}");
        }}.toString();
    }


    /**
     * 根据id查询数据
     * @param id
     * @return
     */
    public String selectDataByid(String id){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType , businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0' and id = #{id}");
        }}.toString();
    }


    /**
     * 根据分类值id查询数据
     * @param classificationValue
     * @return
     */
    public String selectDataByClassificationValue(String classificationValue){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType , businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0' and classificationValue = #{classificationValue}");
        }}.toString();
    }


    /**
     * 查询给定日期范围内的有效数据
     * 查询支出数据（消费支出、借出、贷出、投资支出、还款）
     * @param startDate
     * @param endDate
     * @return
     */
    public String selectExpenditure(Date startDate, Date endDate){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType, businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0' and businessType in ('1' , '4' , '6' , '8' , '10') and documentDate BETWEEN #{param1} AND #{param2}");
            ORDER_BY("documentDate");
        }}.toString();
    }


    /**
     * 查询给定日期范围内的收入数据
     * （收入、借入、贷入、投资赎回、收款）
     * @param startDate
     * @param endDate
     * @return
     */
    public String selectIncome(Date startDate, Date endDate){
        return new SQL(){{
            SELECT("id , documentDate , documentNumber , documentType, businessType , income , expenditure , amount , contacts , classificationValue , handMan , remark");
            FROM("db_business_order");
            WHERE("del = '0' and businessType in ('2' , '5' , '7' , '9' , '11') and documentDate BETWEEN #{param1} AND #{param2}");
            ORDER_BY("documentDate");
        }}.toString();
    }

}
