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
    @SerializedName("message")
    @Expose()
    private String message;

    @SerializedName("tokens")
    @Expose()
    private Tokens tokens;

    public LoginResponse() {
        // empty constructor for Retrofit
    }

    public LoginResponse( String message) {
        this.message = message;
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
                ", message='" + message + '\'' +
                ", tokens=" + tokens.toString() +
                '}';
    }
}
