package com.pojo;

public class Kind extends CommonBean {

    private String name;

    private String sort;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "Kind{" +
                "name='" + name + '\'' +
                ", sort='" + sort + '\'' +
                '}';
    }
}
