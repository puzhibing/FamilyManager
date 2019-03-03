package com.pojo;


import java.util.Date;

public class BusinessOrder extends CommonBean{

    private Date documentDate;//单据日期

    private String documentNumber;//单据编号

    private String documentType;//单据类型(1:支出，2：收入，3：账户转换)

    /**
     * 业务类型
     * 0：创建期初数据及修改余额生成的单据
     * 1：支出数据
     * 2：收入数据
     * 3：转账数据
     * 4：借出数据
     * 5：借入数据
     * 6：贷出数据
     * 7：贷入数据
     * 8：投资支出数据
     * 9：投资赎回数据
     * 10：还款数据
     */
    private String businessType;

    private Object income;//收入账户

    private Object expenditure;//支出账户

    private String amount;//金额

    private Object contacts;//往来对象

    private Object classificationValue;

    private String handMan;//经手人

    private String remark;//备注

    public Date getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(Date documentDate) {
        this.documentDate = documentDate;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public Object getIncome() {
        return income;
    }

    public void setIncome(Object income) {
        this.income = income;
    }

    public Object getExpenditure() {
        return expenditure;
    }

    public void setExpenditure(Object expenditure) {
        this.expenditure = expenditure;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Object getContacts() {
        return contacts;
    }

    public void setContacts(Object contacts) {
        this.contacts = contacts;
    }

    public Object getClassificationValue() {
        return classificationValue;
    }

    public void setClassificationValue(Object classificationValue) {
        this.classificationValue = classificationValue;
    }

    public String getHandMan() {
        return handMan;
    }

    public void setHandMan(String handMan) {
        this.handMan = handMan;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "BusinessOrder{" +
                "documentDate=" + documentDate +
                ", documentNumber='" + documentNumber + '\'' +
                ", documentType='" + documentType + '\'' +
                ", businessType='" + businessType + '\'' +
                ", income=" + income +
                ", expenditure=" + expenditure +
                ", amount='" + amount + '\'' +
                ", contacts='" + contacts + '\'' +
                ", classificationValue=" + classificationValue +
                ", handMan='" + handMan + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
