package com.pojo;

/**
 * 定义分类实体类
 */
public class Classification extends CommonBean {

    private String name;

    private String kind;

    private String type;//分类类型（1：普通分类 ， 2：账户分类）

    private String accountType;//账户类型（1：普通账户，-1信用账户）

    private Integer sort;//排序

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "Classification{" +
                "name='" + name + '\'' +
                ", kind='" + kind + '\'' +
                ", type='" + type + '\'' +
                ", accountType='" + accountType + '\'' +
                ", sort=" + sort +
                '}';
    }
}
