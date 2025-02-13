/*
 * Preference Created by Samiur Prapon
 * Last modified  8/5/21, 8:17 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

public class Preference {
    Application application;
    SharedPreferences authPreferences;
    JwtDecode decoder;

    String refreshToken;
    String accessToken;
    String type;
    String decodedAccessToken;
    String decodedRefreshToken;

    public Preference(Application application) {
        this.application = application;
        authPreferences = application.getSharedPreferences("auth", Context.MODE_PRIVATE);
        decoder = new JwtDecode();
    }

    public String getRefreshToken() {
        refreshToken = authPreferences.getString("refreshToken", null);
        return refreshToken;
    }

    public String getAccessToken() {
        accessToken = authPreferences.getString("accessToken", null);
        return accessToken;
    }

    public void setRefreshToken(String refreshToken) {
        authPreferences.edit().putString("refreshToken", refreshToken).apply();
        authPreferences.edit().putString("decodedRefreshToken", decoder.getDecodedString(refreshToken)).apply();
    }

    public void setAccessToken(String accessToken) {
        authPreferences.edit().putString("accessToken", accessToken).apply();
        authPreferences.edit().putString("decodedAccessToken", decoder.getDecodedString(accessToken)).apply();
    }

    public String getDecodedAccessToken() {
        decodedAccessToken = authPreferences.getString("decodedAccessToken", null);
        return decodedAccessToken;
    }

    public String getDecodedRefreshToken() {
        decodedRefreshToken = authPreferences.getString("decodedRefreshToken", null);
        return decodedRefreshToken;
    }

    public String getType() {
        type = authPreferences.getString("type", null);
        return type;
    }

    public void setType(String type) {
        authPreferences.edit().putString("type", type).apply();
    }

    public void clearAuth() {
        authPreferences.edit().clear().apply();
    }
}
