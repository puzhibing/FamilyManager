package com.pojo;

/**
 * 定义分类实体类
 */
public class Classification extends CommonBean {

    private String name;

    private Integer sort;//排序

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
                ", sort='" + sort + '\'' +
                '}';
    }
}
