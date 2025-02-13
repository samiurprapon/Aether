/*
 * Token Created by Samiur Prapon
 * Last modified  11/19/22, 12:12 AM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models;

import androidx.annotation.NonNull;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Tokens {

    @SerializedName("accessToken")
    @Expose()
    private String accessToken;

    @SerializedName("refreshToken")
    @Expose()
    private String refreshToken;

    public Tokens() {
        // empty constructor for Retrofit
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    @NonNull
    @Override
    public String toString() {
        return "Tokens{" +
                "accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
