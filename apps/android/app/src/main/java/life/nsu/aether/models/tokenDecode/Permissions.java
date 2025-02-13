/*
 * Role Created by Samiur Prapon
 * Last modified  10/23/22, 4:30 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models.tokenDecode;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Permissions {
    @SerializedName("id")
    @Expose
    private String id;

    @SerializedName("type")
    @Expose
    private final String type;

    public Permissions(String id, String type) {
        this.id = id;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }
}
