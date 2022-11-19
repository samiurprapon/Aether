/*
 * UserDetails Created by Samiur Prapon
 * Last modified  11/18/22, 11:27 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserDetails {
    @SerializedName("id")
    @Expose()
    private String id;

    @SerializedName("studentID")
    @Expose()
    private String studentID;

    @SerializedName("school")
    @Expose()
    private String school;

    public UserDetails() {
        // empty constructor for Retrofit
    }

    public String getId() {
        return id;
    }

    public String getStudentID() {
        return studentID;
    }

    public String getSchool() {
        return school;
    }
}
