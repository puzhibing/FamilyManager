package com.pojo;


import java.util.Date;

/**
 * 定义公共实体类，封装共有的属性
 */
public class CommonBean {

    private String id;

    private String del;

    private String insertUserId;

    private Date insertTime;

    private String updateUserId;

    private Date updateTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDel() {
        return del;
    }

    public void setDel(String del) {
        this.del = del;
    }

    public String getInsertUserId() {
        return insertUserId;
    }

    public void setInsertUserId(String insertUserId) {
        this.insertUserId = insertUserId;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "CommonBean{" +
                "id='" + id + '\'' +
                ", del='" + del + '\'' +
                ", insertUserId='" + insertUserId + '\'' +
                ", insertTime='" + insertTime + '\'' +
                ", updateUserId='" + updateUserId + '\'' +
                ", updateTime='" + updateTime + '\'' +
                '}';
    }
}
