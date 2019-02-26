package com.dao.mapper;

import com.dao.sql.ContactsAccountSql;
import com.pojo.ContactsAccount;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Date;
import java.util.List;

/**
 * 定义操作账户表的mapper
 */
public interface ContactsAccountMapper {


    /**
     * 添加数据
     * @param contactsAccount
     */
    @InsertProvider(type = ContactsAccountSql.class, method = "insertData")
    void insertData(ContactsAccount contactsAccount);


    /**
     * 修改数据
     * @param contactsAccount
     */
    @UpdateProvider(type = ContactsAccountSql.class, method = "updateData")
    void updateData(ContactsAccount contactsAccount);


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    @SelectProvider(type = ContactsAccountSql.class, method = "selectDataByClassification")
    List<ContactsAccount> selectDataByClassification(String classification);


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     */
    @UpdateProvider(type = ContactsAccountSql.class, method = "deleteData")
    void deleteData(String id , String updateUserId , Date updateTime);


    /**
     * 根据id查询数据
     * @param id
     * @return
     */
    @SelectProvider(type = ContactsAccountSql.class, method = "selectDataById")
    ContactsAccount selectDataById(String id);


    /**
     * 查询所有数据
     * @return
     */
    @SelectProvider(type = ContactsAccountSql.class, method = "selectAllData")
    List<ContactsAccount> selectAllData();
}
