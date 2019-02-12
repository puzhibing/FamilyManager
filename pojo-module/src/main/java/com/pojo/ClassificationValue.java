package com.pojo;

public class ClassificationValue extends CommonBean {

    private Object classification;//分类

    private String name;

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

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
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
