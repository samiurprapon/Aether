/*
 * MessageResponse Created by Samiur Prapon
 * Last modified  6/1/21 8:14 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MessageResponse {
    @SerializedName("message")
    @Expose()
    private final String message;

    @SerializedName("isError")
    @Expose()
    private boolean isError;

    public MessageResponse(String message) {
        this.message = message;
    }

    public MessageResponse(boolean isError, String message) {
        this.isError = isError;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return isError;
    }
}
