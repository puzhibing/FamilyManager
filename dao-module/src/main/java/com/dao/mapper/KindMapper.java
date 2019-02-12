package com.dao.mapper;

import com.dao.sql.KindSql;
import com.pojo.Kind;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Date;
import java.util.List;

public interface KindMapper {


    /**
     * 添加数据
     * @param kind
     */
    @InsertProvider(type = KindSql.class , method = "insertData")
    void insertData(Kind kind);


    /**
     * 修改数据
     * @param kind
     */
    @UpdateProvider(type = KindSql.class , method = "updateData")
    void updateData(Kind kind);


    /**
     * 查询所有数据
     * @return
     */
    @SelectProvider(type = KindSql.class , method = "selectAll")
    List<Kind> selectAll();


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     */
    @UpdateProvider(type = KindSql.class , method = "deleteData")
    void deleteData(String id , String updateUserId , Date updateTime);

}
