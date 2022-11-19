/*
 * LoginResponse Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.responses;

import androidx.annotation.NonNull;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import life.nsu.aether.models.Tokens;

public class LoginResponse {

    @SerializedName("isError")
    @Expose()
    private boolean isError;

    @SerializedName("message")
    @Expose()
    private String message;

    @SerializedName("tokens")
    @Expose()
    private Tokens tokens;

    public LoginResponse() {
        // empty constructor for Retrofit
    }

    public LoginResponse(boolean isError, String message) {
        this.isError = isError;
        this.message = message;
    }


    public boolean isError() {
        return isError;
    }

    public String getMessage() {
        return message;
    }

    public Tokens getTokens() {
        return tokens;
    }

    @NonNull
    @Override
    public String toString() {
        return "LoginResponse{" +
                "isError=" + isError +
                ", message='" + message + '\'' +
                ", tokens=" + tokens.toString() +
                '}';
    }
}
