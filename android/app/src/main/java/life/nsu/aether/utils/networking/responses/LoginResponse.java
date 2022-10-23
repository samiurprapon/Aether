/*
 * LoginResponse Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import life.nsu.aether.models.Token;

public class LoginResponse {

    @SerializedName("isError")
    @Expose()
    private final boolean isError;

    @SerializedName("message")
    @Expose()
    private final String message;


    @SerializedName("tokens")
    @Expose()
    private Token token;

    public LoginResponse(boolean isError, String message) {
        this.isError = isError;
        this.message = message;
    }

    public LoginResponse(boolean isError, String message, Token token) {
        this.isError = isError;
        this.message = message;
        this.token = token;
    }

    public boolean isError() {
        return isError;
    }

    public String getMessage() {
        return message;
    }

    public Token getToken() {
        return token;
    }
}
