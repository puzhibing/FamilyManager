package com.pojo;

/**
 * 定义往来账户实体类
 */
public class ContactsAccount extends CommonBean {

    private Object classification;//分类

    private String type;//类型（0：普通账户，1：其他往来对象）

    private String name;

    private String agency;//开户机构

    private String accountNumber;//编号

    private String balance;//余额

    public Object getClassification() {
        return classification;
    }

    public void setClassification(Object classification) {
        this.classification = classification;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAgency() {
        return agency;
    }

    public void setAgency(String agency) {
        this.agency = agency;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "ContactsAccount{" +
                "classification=" + classification +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", agency='" + agency + '\'' +
                ", accountNumber='" + accountNumber + '\'' +
                ", balance='" + balance + '\'' +
                '}';
    }
}
