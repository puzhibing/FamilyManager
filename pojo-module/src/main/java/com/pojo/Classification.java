package com.pojo;

/**
 * 定义分类实体类
 */
public class Classification extends CommonBean {

    private String name;

    private String kind;

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
                ", sort=" + sort +
                '}';
    }
}
