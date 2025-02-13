/*
 * User Created by Samiur Prapon
 * Last modified  10/23/22, 4:34 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models.tokenDecode;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("id")
    @Expose
    private String id;

    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("name")
    @Expose
    private Object name;

    @SerializedName("sex")
    @Expose
    private String sex;

    @SerializedName("isBan")
    @Expose
    private Boolean isBan;

    @SerializedName("cid")
    @Expose
    private String cid;

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
    public Object getName() {
        return name;
    }
    public String getSex() {
        return sex;
    }
    public Boolean getIsBan() {
        return isBan;
    }
    public String getCid() {
        return cid;
    }

}
