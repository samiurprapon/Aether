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

    String refreshToken;
    String accessToken;

    public Preference(Application application) {
        this.application = application;
        authPreferences = application.getSharedPreferences("auth", Context.MODE_PRIVATE);
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
    }

    public void setAccessToken(String accessToken) {
        authPreferences.edit().putString("accessToken", accessToken).apply();
    }
}
