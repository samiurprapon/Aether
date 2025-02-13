/*
 * TeacherCoursesResponse Created by Mahfuj Ahmed Jim
 * Last modified  2/22/23, 1:15 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import life.nsu.aether.models.Course;

public class TeacherCoursesResponse {

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

    public TeacherCoursesResponse(boolean success) {
        this.success = success;
    }

    public TeacherCoursesResponse(boolean success, List<Course> courses) {
        this.success = success;
        this.courses = courses;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

}