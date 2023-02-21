/*
 * Course Created by Samiur Prapon
 * Last modified  8/3/21, 8:56 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Course {

    @SerializedName("id")
    @Expose()
    private String id;
    @SerializedName("name")
    @Expose()
    private String name;
    @SerializedName("section")
    @Expose()
    private String section;
    @SerializedName("enrollCode")
    @Expose()
    private String enrollCode;
    @SerializedName("semester")
    @Expose()
    private String semester;
    @SerializedName("isArchived")
    @Expose()
    private boolean isArchived;
    @SerializedName("teacherUid")
    @Expose()
    private String teacherUid;

    public Course() {
        // required constructor
    }

    public Course(String name, boolean isArchived, String teacherUid) {
        this.name = name;
        this.isArchived = isArchived;
        this.teacherUid = teacherUid;
    }

    public String getName() {
        return name;
    }

    public String getSection() {
        return section;
    }

    public String getSemester() {
        return semester;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public String getEnrollCode() {
        return enrollCode;
    }

    public String getTeacherUid() {
        return teacherUid;
    }
}
