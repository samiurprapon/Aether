/*
 * StudentLoginResponse Created by Samiur Prapon
 * Last modified  11/19/22, 2:10 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Student {
    @SerializedName("user")
    @Expose()
    private User user;

    @SerializedName("details")
    @Expose()
    private UserDetails details;

    @SerializedName("permissions")
    @Expose()
    private Permission permission;

    public Student() {
        // empty constructor for retrofit2.Retrofit
    }

    public User getUser() {
        return user;
    }

    public UserDetails getDetails() {
        return details;
    }

    public Permission getPermission() {
        return permission;
    }
}
