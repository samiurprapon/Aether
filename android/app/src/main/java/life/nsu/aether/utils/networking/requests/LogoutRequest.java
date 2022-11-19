/*
 * LogoutRequest Created by Samiur Prapon
 * Last modified  11/19/22, 5:57 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.requests;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LogoutRequest {

    @SerializedName("refreshToken")
    @Expose()
    private String refreshToken;

    public LogoutRequest() {
        // empty constructor for Retrofit
    }

    public LogoutRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
