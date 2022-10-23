/*
 * Details Created by Samiur Prapon
 * Last modified  10/23/22, 4:29 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models.tokenDecode;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Details {
    @SerializedName("id")
    @Expose
    private String id;

    @SerializedName("studentID")
    @Expose
    private Object studentID;

    @SerializedName("school")
    @Expose
    private Object school;

    public String getId() {
        return id;
    }

    public Object getStudentID() {
        return studentID;
    }

    public Object getSchool() {
        return school;
    }

}
