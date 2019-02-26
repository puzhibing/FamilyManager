package com.pojo;

public class ClassificationValue extends CommonBean {

    private Object classification;//分类

    private String name;

    private Integer sort;//排序

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

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "ClassificationValue{" +
                "classification=" + classification +
                ", name='" + name + '\'' +
                ", sort='" + sort + '\'' +
                '}';
    }
}
