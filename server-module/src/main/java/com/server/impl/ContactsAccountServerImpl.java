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

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
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
     * @param accountType
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<Object> insertData(ContactsAccount contactsAccount, String token , String accountType) throws Exception {
        contactsAccount.setId(UUIDUtil.getUUID(20));
        contactsAccount.setDel("0");
        contactsAccount.setInsertTime(new Date());

        String balance = contactsAccount.getBalance();
        //构建业务单据对象
        BusinessOrder businessOrder = new BusinessOrder();
        businessOrder.setId(UUIDUtil.getUUID(20));
        businessOrder.setDocumentDate(new Date());
        businessOrder.setDocumentNumber(DateUtils.getDateNoSeparator());
        businessOrder.setClassificationValue("");
        businessOrder.setHandMan("");
        businessOrder.setDel("0");
        businessOrder.setInsertTime(new Date());
        businessOrder.setInsertUserId("");

        if("0".equals(contactsAccount.getType())){//账户数据
            if("1".equals(accountType)){//普通账户
                businessOrder.setDocumentType("2");
                businessOrder.setBusinessType("0");
                businessOrder.setIncome(contactsAccount.getId());
                businessOrder.setAmount(balance);
                businessOrder.setRemark("新增加“" + contactsAccount.getName() + "”账户数据，增加期初余额【" + Float.valueOf(balance) + "】元");
            }

            if("-1".equals(accountType)){//信用账户
                if(0 > Float.valueOf(balance)){//如果余额为负数
                    businessOrder.setDocumentType("1");
                    businessOrder.setBusinessType("0");
                    businessOrder.setExpenditure(contactsAccount.getId());
                    businessOrder.setAmount(String.valueOf(Float.valueOf(balance) * -1));
                    businessOrder.setRemark("新增加“" + contactsAccount.getName() + "”账户数据，增加欠款余额【" + Float.valueOf(balance) * -1 + "】元");
                }else{
                    businessOrder.setDocumentType("2");
                    businessOrder.setBusinessType("0");
                    businessOrder.setIncome(contactsAccount.getId());
                    businessOrder.setAmount(balance);
                    businessOrder.setRemark("新增加“" + contactsAccount.getName() + "”账户数据，增加欠款余额【" + Float.valueOf(balance) + "】元");
                }
            }

        }else{//成员数据
            if(0 > Float.valueOf(balance)){//如果余额为负数
                businessOrder.setDocumentType("1");
                businessOrder.setBusinessType("0");
                businessOrder.setExpenditure(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(Float.valueOf(balance) * -1));
                businessOrder.setRemark("新增加“" + contactsAccount.getName() + "”成员数据，增加欠款余额【" + Float.valueOf(balance) * -1 + "】元");
            }else{
                businessOrder.setDocumentType("2");
                businessOrder.setBusinessType("0");
                businessOrder.setIncome(contactsAccount.getId());
                businessOrder.setAmount(balance);
                businessOrder.setRemark("新增加“" + contactsAccount.getName() + "”成员数据，增加欠款余额【" + Float.valueOf(balance) + "】元");
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
    public ResultBeanUtil<Object> updateData(ContactsAccount contactsAccount, String token , String accountType) throws Exception {
        contactsAccount.setUpdateTime(new Date());
        contactsAccount.setUpdateUserId("");
        try {
            boolean b = this.insertDocuments(contactsAccount , token , accountType);
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
        try {
            contactsAccount = contactsAccountMapperImpl.selectDataById(id);
            BigDecimal b1 = new BigDecimal(contactsAccount.getBalance());
            BigDecimal b2 = new BigDecimal(amount);
            switch (plusOrMinus){
                case "plus":
                    contactsAccount.setBalance(b1.add(b2).setScale(2, RoundingMode.HALF_EVEN).toString());
                    break;
                case "minus":
                    contactsAccount.setBalance(b1.subtract(b2).setScale(2, RoundingMode.HALF_EVEN).toString());
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
     * 查询所有数据
     * @return
     * @throws Exception
     */
    @Override
    public ResultBeanUtil<List<ContactsAccount>> selectAllData() throws Exception {
        try {
            contactsAccounts = contactsAccountMapperImpl.selectAllData();
            resultBeanUtilList = ResultBeanUtil.getResultBeanUtil("查询成功" , true , contactsAccounts);
        }catch (Exception e){
            throw e;
        }
        return resultBeanUtilList;
    }


    /**
     * 修改余额数据的时候生成对应的业务单据
     * (多线程安全)
     * @param contactsAccount
     * @param token
     * @return
     * @throws Exception
     */
    public synchronized Boolean insertDocuments(ContactsAccount contactsAccount , String token , String accountType) throws Exception{
        boolean b = false;
        try {
            this.contactsAccount = contactsAccountMapperImpl.selectDataById(contactsAccount.getId());//获取原始数据
            BigDecimal b1 = new BigDecimal(this.contactsAccount.getBalance());
            BigDecimal b2 = new BigDecimal(contactsAccount.getBalance());
            Float difference = b1.subtract(b2).setScale(2, RoundingMode.HALF_EVEN).floatValue();

            //构建对象
            BusinessOrder businessOrder = new BusinessOrder();
            businessOrder.setDocumentDate(new Date());
            businessOrder.setDocumentNumber(UUIDUtil.getUUID(30));
            businessOrder.setHandMan("");

            if(0 > difference){//增加
                businessOrder.setDocumentType("2");
                businessOrder.setBusinessType("0");
                businessOrder.setExpenditure(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(difference * -1));
                businessOrder.setRemark("账户余额变动，增加" + difference * -1 + "金额");
            }else if(0 < difference){//减少
                businessOrder.setDocumentType("1");
                businessOrder.setBusinessType("0");
                businessOrder.setIncome(contactsAccount.getId());
                businessOrder.setAmount(String.valueOf(difference));
                businessOrder.setRemark("账户余额变动，减少" + difference + "金额");
            }else{//金额没发生变化，不修改业务单据数据
                return true;
            }

            businessOrderServerImpl.insertData(businessOrder , token , "");
        }catch (Exception e){
            throw e;
        }
        return b;
    }



}
