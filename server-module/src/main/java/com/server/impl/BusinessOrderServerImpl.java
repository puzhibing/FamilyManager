package com.server.impl;

import com.dao.mapper.BusinessOrderMapper;
import com.pojo.BusinessOrder;
import com.server.BusinessOrderServer;
import com.server.ContactsAccountServer;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class BusinessOrderServerImpl implements BusinessOrderServer {

    @Autowired
    private BusinessOrderMapper businessOrderMapper;

    @Autowired
    private ContactsAccountServer contactsaccountServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<BusinessOrder>> resultBeanUtilList;

    private List<BusinessOrder> businessOrders;

    private BusinessOrder businessOrder;


    /**
     * 添加数据
     * 添加数据的同时需要修改对应账户的数据
     * @param businessOrder
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(BusinessOrder businessOrder, String token) throws Exception {
        /**
         * 通过单据类型的不同来处理对应的数据
         * 1:扣减账户余额
         * 2:添加账户余额
         * 3:往来账户之间转换金额
         */
        String id = UUIDUtil.getUUID(20);
        businessOrder.setId(id);
        businessOrder.setDel("0");
        businessOrder.setInsertTime(new Date());
        businessOrder.setInsertUserId("");
        try {
            businessOrderMapper.insertData(businessOrder);
        }catch (Exception e){
            throw e;
        }

        boolean b = this.modifyData(businessOrder , token);
        if(b){
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
        }else{
            //还原数据，删除添加成功的业务数据
            this.deleteData(id , token);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加失败" , false);
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * 修改数据之前需还原原始数据对应往来账户的余额数据
     * 然后再对新的往来账户余额数据进行处理
     * @param businessOrder
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> updateData(BusinessOrder businessOrder, String token) throws Exception {
        //还原原始数据
        boolean b = false;
        try {
            this.businessOrder = businessOrderMapper.selectDataByid(businessOrder.getId());
            b = this.reduction(businessOrder.getId() , token);
        }catch (Exception e){
            throw e;
        }

        //处理新的数据
        if(b){
            b = this.modifyData(businessOrder , token);
            if(b){
                businessOrder.setDel(this.businessOrder.getDel());
                businessOrder.setInsertUserId(this.businessOrder.getInsertUserId());
                businessOrder.setInsertTime(this.businessOrder.getInsertTime());
                businessOrder.setUpdateTime(new Date());
                businessOrder.setUpdateUserId("");
                try {
                    businessOrderMapper.updateData(businessOrder);
                    resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
                }catch (Exception e){
                    throw e;
                }
            }
        }
        return resultBeanUtilObject;
    }





    /**
     * 查询所有数据（对单据日期进行降序排序，实现分页）
     * @param page 查询的页数，第一页从1开始
     * @param size 每页查询的条数
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<BusinessOrder>> selectAll(Integer page , Integer size) throws Exception {
        Integer start = (page - 1) * size;//计算数据库查询的开始下标
        Integer sun = 0;//总条数
        Integer sunPage = 0;//总页数
        try {
            businessOrders = businessOrderMapper.selectAll(start , size);
            sun = businessOrderMapper.selectAllCount();
            sunPage = (sun % size > 0) ? (sun / size) + 1 : sun / size;

            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , businessOrders , page
                    , sunPage , sun);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }


    /**
     * 删除数据
     * 删除数据，需要还原当前业务单据对应的往来账户的余额数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> deleteData(String id , String token) throws Exception {
        try {
            boolean b = this.reduction(id , token);
            if(b){
                businessOrderMapper.deleteData(id , "" , new Date());
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除成功" , true);
            }else {
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除失败" , false);
            }
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 添加数据的时候处理对象账户的数据
     * @param businessOrder
     * @param token
     * @return
     */
    private boolean modifyData(BusinessOrder businessOrder , String token){
        boolean b = false;
        String documentType = businessOrder.getDocumentType();
        switch (documentType){
            case "1":
                //扣减账户余额
                try {
                    b = contactsaccountServerImpl.updateDataBalance((String) businessOrder.getExpenditure(), "minus"
                            , businessOrder.getAmount() , token).getB();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case "2":
                //添加账户余额
                try {
                    b = contactsaccountServerImpl.updateDataBalance((String) businessOrder.getIncome(), "plus"
                            , businessOrder.getAmount() , token).getB();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case "3":
                //往来账户之间转换金额
                try {
                    b = contactsaccountServerImpl.updateDataBalance((String) businessOrder.getExpenditure(), "minus"
                            , businessOrder.getAmount() , token).getB();
                } catch (Exception e) {
                    e.printStackTrace();
                }

                if(b){
                    try {
                        b = contactsaccountServerImpl.updateDataBalance((String) businessOrder.getIncome(), "plus"
                                , businessOrder.getAmount() , token).getB();
                    } catch (Exception e) {//加的时候出现异常则将减的部分还原
                        e.printStackTrace();
                        try {
                            contactsaccountServerImpl.updateDataBalance((String) businessOrder.getExpenditure(), "plus"
                                    , businessOrder.getAmount() , token).getB();

                            b = false;
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                    }
                }
                break;
            default:
                break;
        }
        return b;
    }




    /**
     * 定义还原之前的账户数据
     * 将之前加的数据减少来，将减的数据加上去
     * @param id 业务单据的id
     * @param token
     * @return
     * @throws Exception
     */
    public boolean reduction(String id , String token) throws Exception{
        //还原之前账户的数据
        boolean b = false;
        try{
            this.businessOrder = businessOrderMapper.selectDataByid(id);
        }catch (Exception e){
            throw e;
        }
        try {
            b = contactsaccountServerImpl.updateDataBalance((String) this.businessOrder.getIncome()
                    , "minus" , this.businessOrder.getAmount() , token).getB();//将之前加的部分减下来
        }catch (Exception e){
            throw e;
        }
        if(b){
            try {
                b = contactsaccountServerImpl.updateDataBalance((String) this.businessOrder.getExpenditure()
                        , "plus" , this.businessOrder.getAmount() , token).getB();//将之前减的部分加上来
            }catch (Exception e){
                contactsaccountServerImpl.updateDataBalance((String) this.businessOrder.getIncome()
                        , "plus" , this.businessOrder.getAmount() , token).getB();//将之前加的部分还原
                throw e;
            }
        }
        return b;
    }
}
