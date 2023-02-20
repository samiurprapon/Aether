/*
 * StudentProfileDetailsResponse Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import life.nsu.aether.models.Student;

public class StudentProfileDetailsResponse {

    public StudentProfileDetailsResponse(boolean success, String message, Student student) {
        this.success = success;
        this.message = message;
        this.student = student;
    }

    @SerializedName("success")
    @Expose()
    private Boolean success;
    @SerializedName("message")
    @Expose()
    private String message;
    @SerializedName("data")
    @Expose()
    private Student student;

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}
