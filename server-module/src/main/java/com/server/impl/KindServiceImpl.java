package com.server.impl;

import com.dao.mapper.ClassificationMapper;
import com.dao.mapper.KindMapper;
import com.pojo.Classification;
import com.pojo.Kind;
import com.server.KindService;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class KindServiceImpl implements KindService {

    @Autowired
    private KindMapper kindMapper;

    @Autowired
    private ClassificationMapper classificationMapper;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<Kind>> resultBeanUtilList;

    private List<Kind> kinds;


    /**
     * 添加数据
     * @param kind
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(Kind kind, String token) throws Exception {
        kind.setId(UUIDUtil.getUUID(20));
        kind.setDel("0");
        kind.setInsertUserId("");
        kind.setInsertTime(new Date());
        try {
            kindMapper.insertData(kind);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * @param kind
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> updateData(Kind kind, String token) throws Exception {
        kind.setUpdateTime(new Date());
        kind.setUpdateUserId("");
        try {
            kindMapper.updateData(kind);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 删除数据
     * 删除数据之前先检测是否有关联数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> deleteData(String id, String token) throws Exception {
        try {
            List<Classification> list = classificationMapper.selectDataByKind(id);
            if(0 == list.size()){
                kindMapper.deleteData(id , "" , new Date());
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除成功" , true);
            }else{
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("有数据关联，无法进行删除操作。" , true);
            }

        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 查询所有数据（升序排序）
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<Kind>> selectAll() throws Exception {
        try {
            kinds = kindMapper.selectAll();
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , kinds);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }
}
