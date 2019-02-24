package com.pojo;

/**
 * 定义成员实体类
 */
public class Member extends CommonBean {

    private Object classification;//分类

    private String name;

    private String balance;//余额

    private String sort;//排序

    public Object getClassification() {
        return classification;
    }

    public void setClassification(Object classification) {
        this.classification = classification;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "Member{" +
                "classification=" + classification +
                ", name='" + name + '\'' +
                ", balance='" + balance + '\'' +
                ", sort='" + sort + '\'' +
                '}';
    }
}
