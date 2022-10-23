/*
 * RefreshResponse Created by Samiur Prapon
 * Last modified  8/5/21, 7:53 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class RefreshResponse {
    @SerializedName("isError")
    @Expose()
    private final boolean isError;

    @SerializedName("message")
    @Expose()
    private final String message;

    @SerializedName("accessToken")
    @Expose()
    private final String accessToken;

    public RefreshResponse(boolean isError, String message, String accessToken) {
        this.isError = isError;
        this.message = message;
        this.accessToken = accessToken;
    }

    public boolean isError() {
        return isError;
    }

    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
