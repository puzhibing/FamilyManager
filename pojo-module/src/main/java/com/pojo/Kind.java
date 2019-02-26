package com.pojo;

public class Kind extends CommonBean {

    private String name;

    private String type;//类型

    private Integer sort;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "Kind{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", sort='" + sort + '\'' +
                '}';
    }
}
