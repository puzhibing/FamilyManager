package com.server;

import com.pojo.ContactsAccount;
import com.tools.ResultBeanUtil;

import java.util.List;

public interface ContactsAccountServer {

    /**
     *
     * @param contactsAccount
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> insertData(ContactsAccount contactsAccount , String token) throws Exception;


    /**
     * 修改数据
     * 修改数据需要同时生成一张业务数据
     * @param contactsAccount
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateData(ContactsAccount contactsAccount , String token) throws Exception;


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     * @throws Exception
     */
    ResultBeanUtil<List<ContactsAccount>> selectDataByClassification(String classification) throws Exception;


    /**
     * 删除数据
     * 删除数据之前需判断是会否有关联数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> deleteData(String id , String token) throws Exception;


    /**
     * 处理修改余额数据（在原数据的基础上进行加减操作）
     * @param id
     * @param plusOrMinus
     * @param amount
     * @param token
     * @return
     * @throws Exception
     */
    ResultBeanUtil<Object> updateDataBalance(String id , String plusOrMinus , String amount , String token) throws Exception;
}
