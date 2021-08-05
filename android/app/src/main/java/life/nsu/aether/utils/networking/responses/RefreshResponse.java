/*
 * RefreshResponse Created by Samiur Prapon
 * Last modified  8/5/21, 7:53 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

public class RefreshResponse {
    private boolean success;
    private String message;
    private String accessToken;

    public RefreshResponse(boolean success, String message, String accessToken) {
        this.success = success;
        this.message = message;
        this.accessToken = accessToken;
    }

    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public boolean isSuccess() {
        return success;
    }
}
