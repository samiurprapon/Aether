/*
 * LoginResponse Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginResponse {

    @SerializedName("message")
    @Expose()
    private String message;

    @SerializedName("accessToken")
    @Expose()
    private String accessToken;

    @SerializedName("refreshToken")
    @Expose()
    private String refreshToken;

    @SerializedName("type")
    @Expose()
    private String type;

    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getType() {
        return type;
    }
}
