/*
 * TeacherProfileDetailsResponse Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 3:13 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import life.nsu.aether.models.Teacher;

public class TeacherProfileDetailsResponse {

    public TeacherProfileDetailsResponse(Boolean success, String message, Teacher teacher) {
        this.success = success;
        this.message = message;
        this.teacher = teacher;
    }

    @SerializedName("success")
    @Expose()
    private Boolean success;
    @SerializedName("message")
    @Expose()
    private String message;
    @SerializedName("profile")
    @Expose()
    private Teacher teacher;

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

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

}
