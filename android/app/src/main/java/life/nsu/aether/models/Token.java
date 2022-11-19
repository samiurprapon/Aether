/*
 * Token Created by Samiur Prapon
 * Last modified  10/23/22, 3:39 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Token {
    @SerializedName("accessToken")
    @Expose()
    private final String accessToken;

    @SerializedName("refreshToken")
    @Expose()
    private final String refreshToken;

    public Token(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }


}
