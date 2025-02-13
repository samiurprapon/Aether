/*
 * StudentCourseResponse Created by Mahfuj Ahmed Jim
 * Last modified  3/8/23, 12:33 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import life.nsu.aether.models.Course;

public class StudentCourseResponse {

    @SerializedName("message")
    @Expose()
    private String message;
    @SerializedName("success")
    @Expose()
    private boolean success;
    @SerializedName("courses")
    @Expose()
    List<Course> courses;
    @SerializedName("course")
    @Expose()
    private Course course;

    public StudentCourseResponse(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public Course getCourse() {
        return course;
    }

}
