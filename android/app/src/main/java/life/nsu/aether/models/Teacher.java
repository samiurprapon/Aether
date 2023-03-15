/*
 * Teacher Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 3:17 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Teacher {

    @SerializedName("id")
    @Expose()
    private String id;
    @SerializedName("initial")
    @Expose()
    private String initial;
    @SerializedName("Users")
    @Expose()
    private User Users;

    public String getId() {
        return id;
    }

    public String getInitial() {
        return initial;
    }

    public User getUsers() {
        return Users;
    }
}
