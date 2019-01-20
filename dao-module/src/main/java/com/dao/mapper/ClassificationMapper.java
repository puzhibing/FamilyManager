package com.dao.mapper;

import com.dao.sql.ClassificationSql;
import com.pojo.Classification;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Date;
import java.util.List;

public interface ClassificationMapper {


    /**
     * 添加数据
     * @param classification
     */
    @InsertProvider(type = ClassificationSql.class , method = "insertData")
    void insertData(Classification classification);


    /**
     * 查询所有数据
     * @return
     */
    @SelectProvider(type = ClassificationSql.class , method = "selectAll")
    List<Classification> selectAll();


    /**
     * 修改数据
     * @param classification
     */
    @UpdateProvider(type = ClassificationSql.class , method = "updateData")
    void updateData(Classification classification);


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     */
    @UpdateProvider(type = ClassificationSql.class , method = "deleteData")
    void deleteData(String id , String updateUserId , Date updateTime);
}
