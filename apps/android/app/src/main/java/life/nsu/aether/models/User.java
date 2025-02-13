/*
 * UserCredential Created by Samiur Prapon
 * Last modified  6/1/21 5:51 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.models;

import androidx.annotation.NonNull;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("id")
    @Expose()
    private String id;

    @SerializedName("email")
    @Expose()
    private String email;

    @SerializedName("school")
    @Expose()
    private String school;

    @SerializedName("name")
    @Expose()
    private String name;

    @SerializedName("sex")
    @Expose()
    private String sex;

    @SerializedName("cid")
    @Expose()
    private String cid;

    @SerializedName("isBan")
    @Expose()
    private boolean isBan;

    public User() {
        // empty constructor for Retrofit
    }


    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getSchool() {
        return school;
    }

    public String getSex() {
        return sex;
    }

    public String getCid() {
        return cid;
    }

    public boolean isBan() {
        return isBan;
    }

    @NonNull
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", cid='" + cid + '\'' +
                ", isBan=" + isBan +
                '}';
    }
}
