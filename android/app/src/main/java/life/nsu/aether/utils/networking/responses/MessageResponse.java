/*
 * MessageResponse Created by Samiur Prapon
 * Last modified  6/1/21 8:14 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.SerializedName;

public class MessageResponse {
    @SerializedName("message")
    private String message;

    public MessageResponse() {
        // empty constructor for Retrofit
    }

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
