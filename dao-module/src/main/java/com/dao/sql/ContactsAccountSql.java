package com.dao.sql;

import com.pojo.ContactsAccount;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;

public class ContactsAccountSql {


    /**
     * 添加数据
     * @param contactsAccount
     * @return
     */
    public String insertData(ContactsAccount contactsAccount){
        return new SQL(){{
            INSERT_INTO("db_contacts_account");
            INTO_COLUMNS("id , classification , type , name , agency , accountNumber , balance , notdel , sort");
            INTO_COLUMNS("del , insertUserId , insertTime , updateUserId , updateTime");
            INTO_VALUES("#{id} , #{classification} , #{type} , #{name} , #{agency} , #{accountNumber} , #{balance} , #{notdel} , #{sort}");
            INTO_VALUES("#{del} , #{insertUserId} , #{insertTime} , #{updateUserId} , #{updateTime}");
        }}.toString();
    }


    /**
     * 修改数据
     * @param contactsAccount
     * @return
     */
    public String updateData(ContactsAccount contactsAccount){
        return new SQL(){{
            UPDATE("db_contacts_account");
            SET("name = #{name} , agency = #{agency} , accountNumber = #{accountNumber} , balance = #{balance} , sort = #{sort}");
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
            SELECT("id , classification , type , name , agency , accountNumber , balance , notdel , sort");
            FROM("db_contacts_account");
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
            UPDATE("db_contacts_account");
            SET("del = '-1' , updateUserId = #{param2} , updateTime = #{param3}");
            WHERE("id = #{param1}");
        }}.toString();
    }


    /**
     * 根据id查询数据
     * @param id
     * @return
     */
    public String selectDataById(String id){
        return new SQL(){{
            SELECT("id , classification , type , name , agency , accountNumber , balance , notdel , sort");
            SELECT("del , insertUserId , insertTime , updateUserId , updateTime");
            FROM("db_contacts_account");
            WHERE("id = #{id} and del = '0'");
        }}.toString();
    }


    /**
     * 查询所有数据
     * @return
     */
    public String selectAllData(){
        return new SQL(){{
            SELECT("id , classification , type , name , agency , accountNumber , balance , notdel , sort");
            SELECT("del , insertUserId , insertTime , updateUserId , updateTime");
            FROM("db_contacts_account");
            WHERE("del = '0'");
        }}.toString();
    }
}
