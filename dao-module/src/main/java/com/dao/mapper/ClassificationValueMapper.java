package com.dao.mapper;

import com.dao.sql.ClassificationValueSql;
import com.pojo.ClassificationValue;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Date;
import java.util.List;

public interface ClassificationValueMapper {


    /**
     * 添加数据
     * @param classificationValue
     */
    @InsertProvider(type = ClassificationValueSql.class , method = "insertData")
    void insertData(ClassificationValue classificationValue);



    /**
     * 修改数据
     * @param classificationValue
     */
    @UpdateProvider(type = ClassificationValueSql.class, method = "updateData")
    void updateData(ClassificationValue classificationValue);



    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     */
    @SelectProvider(type = ClassificationValueSql.class, method = "selectDataByClassification")
    List<ClassificationValue> selectDataByClassification(String classification);


    /**
     * 删除数据
     * @param id
     * @param updateUserId
     * @param updateTime
     */
    @UpdateProvider(type = ClassificationValueSql.class, method = "deleteData")
    void deleteData(String id , String updateUserId , Date updateTime);
}
