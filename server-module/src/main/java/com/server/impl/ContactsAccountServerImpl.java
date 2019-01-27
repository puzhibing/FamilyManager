package com.server.impl;

import com.dao.mapper.BusinessOrderMapper;
import com.dao.mapper.ContactsAccountMapper;
import com.pojo.BusinessOrder;
import com.pojo.ContactsAccount;
import com.server.BusinessOrderServer;
import com.server.ContactsAccountServer;
import com.tools.DateUtilEnum;
import com.tools.DateUtils;
import com.tools.ResultBeanUtil;
import com.tools.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ContactsAccountServerImpl implements ContactsAccountServer {

    @Autowired
    private ContactsAccountMapper contactsAccountMapperImpl;

    @Autowired
    private BusinessOrderMapper businessOrderMapper;

    @Autowired
    private BusinessOrderServer businessOrderServerImpl;

    private ResultBeanUtil<Object> resultBeanUtilObject;

    private ResultBeanUtil<List<ContactsAccount>> resultBeanUtilList;

    private List<ContactsAccount> contactsAccounts;

    private ContactsAccount contactsAccount;

    /**
     * 添加数据
     * 添加新账户数据的同时需要添加对应的业务单据数据
     * @param contactsAccount
     * @param token
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(ContactsAccount contactsAccount, String token) throws Exception {
        contactsAccount.setId(UUIDUtil.getUUID(20));
        contactsAccount.setDel("0");
        contactsAccount.setInsertTime(new Date());

        String balance = contactsAccount.getBalance();
        //构建业务单据对象
        BusinessOrder businessOrder = new BusinessOrder();
        businessOrder.setDocumentDate(DateUtils.getCurrentDateTime(DateUtilEnum.SHORTBAR , DateUtilEnum.COLON));
        businessOrder.setDocumentNumber(UUIDUtil.getUUID(30));
        businessOrder.setHandMan("");

        //普通账户
        if("0".equals(contactsAccount.getType())){
            businessOrder.setDocumentType("2");
            businessOrder.setIncome(contactsAccount.getId());
            businessOrder.setAmount(balance);
            businessOrder.setRemark("新增加普通账户数据，增加期初账户余额" + balance + "元");
        }else{
            //往来账户
            if(0 > Integer.valueOf(balance)){//如果余额为负数
                businessOrder.setDocumentType("1");
                businessOrder.setExpenditure(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(Integer.valueOf(balance) * -1));
                businessOrder.setRemark("新增加往来账户数据，增加借款金额" + Integer.valueOf(balance) * -1 + "元");
            }else{
                businessOrder.setDocumentType("2");
                businessOrder.setIncome(contactsAccount.getId());
                businessOrder.setAmount(balance);
                businessOrder.setRemark("新增加往来账户数据，增加欠款金额" + balance + "元");
            }
        }

        try{
            businessOrderMapper.insertData(businessOrder);
            contactsAccountMapperImpl.insertData(contactsAccount);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("添加成功" , true);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 修改数据
     * 修改余额数据同时需要生产一张业务单据
     * @param contactsAccount
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> updateData(ContactsAccount contactsAccount, String token) throws Exception {
        contactsAccount.setUpdateTime(new Date());
        contactsAccount.setUpdateUserId("");
        try {

            boolean b = this.insertDocuments(contactsAccount , token);
            if(b){
                contactsAccountMapperImpl.updateData(contactsAccount);//修改基础数据
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
            }
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 根据分类id查询数据
     * @param classification
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<ContactsAccount>> selectDataByClassification(String classification) throws Exception {
        try {
            contactsAccounts = contactsAccountMapperImpl.selectDataByClassification(classification);
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , contactsAccounts);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }


    /**
     * 删除数据
     * 删除数据之前需判断是否有关联数据
     * @param id
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> deleteData(String id, String token) throws Exception {
        try {
            List<BusinessOrder> businessOrders = businessOrderMapper.selectDataByIncomeOrExpenditure(id);
            if(businessOrders.size() > 0){
                //有关联数据，无法进行删除操作。
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("有数据关联，无法进行删除操作。" , true);
            }else {
                contactsAccountMapperImpl.deleteData(id , "" , new Date());
                resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("删除成功" , true);
            }
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilObject;
    }


    /**
     * 处理修改余额数据（在原数据的基础上进行加减操作）
     * 以线程安全的方式来处理余额变更
     * @param id
     * @param plusOrMinus
     * @param amount
     * @return
     * @throws Exception
     */
    @Override
    public synchronized ResultBeanUtil<Object> updateDataBalance(String id, String plusOrMinus, String amount , String token) throws Exception {
        Float oldData;
        try {
            contactsAccount = contactsAccountMapperImpl.selectDataById(id);
            oldData = Float.valueOf(contactsAccount.getBalance());
            switch (plusOrMinus){
                case "plus":
                    contactsAccount.setBalance(String.valueOf(oldData + Float.valueOf(amount)));
                    break;
                case "minus":
                    contactsAccount.setBalance(String.valueOf(oldData - Float.valueOf(amount)));
                    break;
                default:
                    resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("运算参数不合法." , false);
                    break;
            }
            contactsAccount.setUpdateTime(new Date());
            contactsAccount.setUpdateUserId("");

            contactsAccountMapperImpl.updateData(contactsAccount);
            resultBeanUtilObject = ResultBeanUtil.getResultBeanUtil("修改成功" , true);
        }catch (Exception e){
            throw e;
        }

        return resultBeanUtilObject;
    }


    /**
     * 修改余额数据的时候生成对应的业务单据
     * @param contactsAccount
     * @param token
     * @return
     * @throws Exception
     */
    public Boolean insertDocuments(ContactsAccount contactsAccount , String token) throws Exception{
        boolean b = false;
        try {
            this.contactsAccount = contactsAccountMapperImpl.selectDataById(contactsAccount.getId());//获取原始数据
            Integer difference = Integer.valueOf(this.contactsAccount.getBalance())
                    - Integer.valueOf(contactsAccount.getBalance());
            //构建对象
            BusinessOrder businessOrder = new BusinessOrder();
            businessOrder.setDocumentDate(DateUtils.getCurrentDateTime(DateUtilEnum.SHORTBAR , DateUtilEnum.COLON));
            businessOrder.setDocumentNumber(UUIDUtil.getUUID(30));
            businessOrder.setHandMan("");

            if(0 > difference){//减少
                businessOrder.setDocumentType("1");
                businessOrder.setExpenditure(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(difference * -1));
                businessOrder.setRemark("账户余额变动，减少" + difference * -1 + "金额");
            }else if(0 < difference){//增加
                businessOrder.setDocumentType("2");
                businessOrder.setIncome(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(difference));
                businessOrder.setRemark("账户余额变动，增加" + difference + "金额");
            }

            businessOrderServerImpl.insertData(businessOrder , token);
        }catch (Exception e){
            throw e;
        }
        return b;
    }



}
