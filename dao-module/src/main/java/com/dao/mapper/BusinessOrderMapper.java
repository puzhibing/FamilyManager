package com.dao.mapper;

import com.dao.sql.BusinessOrderSql;
import com.pojo.BusinessOrder;
import com.pojo.ClassificationValue;
import com.pojo.ContactsAccount;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

public interface BusinessOrderMapper {


    /**
     * 添加数据
     * @param businessOrder
     */
    @InsertProvider(type = BusinessOrderSql.class , method = "insertData")
    void insertData(BusinessOrder businessOrder);


    /**
     * 修改数据
     * @param businessOrder
     */
    @UpdateProvider(type = BusinessOrderSql.class , method = "updateData")
    void updateData(BusinessOrder businessOrder);


    /**
     * 查询所有数据（根据单据日期降序排序，分页查询）
     * @param start
     * @param size
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectAll")
    @Results({
            @Result(property = "id" , column = "id" , id = true),
            @Result(property = "documentDate" , column = "documentDate"),
            @Result(property = "documentNumber" , column = "documentNumber"),
            @Result(property = "documentType" , column = "documentType"),
            @Result(property = "income" , column = "income" , javaType = ContactsAccount.class , one = @One(
                    select = "com.dao.mapper.ContactsAccountMapper.selectDataById"
            )),
            @Result(property = "expenditure" , column = "expenditure" , javaType = ContactsAccount.class , one = @One(
                    select = "com.dao.mapper.ContactsAccountMapper.selectDataById"
            )),
            @Result(property = "amount" , column = "amount"),
            @Result(property = "classificationValue" , column = "classificationValue" , javaType = ClassificationValue.class , one = @One(
                    select = "com.dao.mapper.ClassificationValueMapper.selectDataById"
            )),
            @Result(property = "handMan" , column = "handMan"),
            @Result(property = "remark" , column = "remark")
    })
    List<BusinessOrder> selectAll(Integer start , Integer size);

    /**
     * 查询所有数据的总数和
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectAllCount")
    Integer selectAllCount();


    /**
     * 查询单据中（income/expenditure）字段包含给定id的数据
     * @param id
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectDataByIncomeOrExpenditure")
    List<BusinessOrder> selectDataByIncomeOrExpenditure(String id);


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     */
    @UpdateProvider(type = BusinessOrderSql.class , method = "deleteData")
    void deleteData(String id , String updateUserId , Date updateTime);


    /**
     * 根据id查询数据
     * @param id
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectDataByid")
    BusinessOrder selectDataByid(String id);


    /**
     * 根据分类值id查询数据
     * @param classificationValue
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectDataByClassificationValue")
    List<BusinessOrder> selectDataByClassificationValue(String classificationValue);


    /**
     * 查询给定日期范围内的有效数据
     * @param startDate
     * @param endDate
     * @return
     */
    @SelectProvider(type = BusinessOrderSql.class , method = "selectExpenditure")
    List<BusinessOrder> selectExpenditure(Date startDate, Date endDate);
}
