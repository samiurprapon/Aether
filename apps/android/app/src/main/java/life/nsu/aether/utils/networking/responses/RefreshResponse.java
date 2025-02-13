/*
 * RefreshResponse Created by Samiur Prapon
 * Last modified  8/5/21, 7:53 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import androidx.annotation.NonNull;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class RefreshResponse {
    @SerializedName("message")
    @Expose()
    private String message;

    @SerializedName("accessToken")
    @Expose()
    private String accessToken;

    public RefreshResponse() {
        // empty constructor for Retrofit
    }

    public RefreshResponse(String message, String accessToken) {
        this.message = message;
        this.accessToken = accessToken;
    }


    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    @NonNull
    @Override
    public String toString() {
        return "RefreshResponse{" +
                ", message='" + message + '\'' +
                ", accessToken='" + accessToken + '\'' +
                '}';
    }
}
