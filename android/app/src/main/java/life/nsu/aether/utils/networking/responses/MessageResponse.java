/*
 * MessageResponse Created by Samiur Prapon
 * Last modified  6/1/21 8:14 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
