package com.dao.mapper;

import com.dao.sql.BusinessOrderSql;
import com.pojo.BusinessOrder;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

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
}
