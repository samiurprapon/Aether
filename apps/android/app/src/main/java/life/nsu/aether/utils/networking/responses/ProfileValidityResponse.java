/*
 * ProfileValidityResponse Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

public class ProfileValidityResponse {
    private boolean success;
    private String message;
    private boolean isCompleted;

    public ProfileValidityResponse(boolean success, String message, boolean isCompleted) {
        this.success = success;
        this.message = message;
        this.isCompleted = isCompleted;
    }

    public String getMessage() {
        return message;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public boolean isSuccess() {
        return success;
    }
}
