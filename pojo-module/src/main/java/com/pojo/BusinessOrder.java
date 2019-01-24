package com.pojo;


public class BusinessOrder extends CommonBean{

    private String documentDate;//单据日期

    private String documentNumber;//单据编号

    private String documentType;//单据类型

    private Object income;//收入账户

    private Object expenditure;//支出账户

    private String amount;//金额

    private Object classificationValue;

    private String handMan;//经手人

    private String remark;//备注

    public String getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(String documentDate) {
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
                "documentDate='" + documentDate + '\'' +
                ", documentNumber='" + documentNumber + '\'' +
                ", documentType='" + documentType + '\'' +
                ", income=" + income +
                ", expenditure=" + expenditure +
                ", amount='" + amount + '\'' +
                ", classificationValue=" + classificationValue +
                ", handMan='" + handMan + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
