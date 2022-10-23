/*
 * LoginViewModel Created by Samiur Prapon
 * Last modified  8/15/21, 12:05 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.authentication;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.Objects;

import life.nsu.aether.repositories.LoginRepository;
import life.nsu.aether.repositories.ProfileRepository;
import life.nsu.aether.utils.DecodeJwt;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;
import life.nsu.aether.views.student.StudentHomeActivity;
import life.nsu.aether.views.student.profile.EditProfileActivity;

public class LoginViewModel extends AndroidViewModel {
    LoginRepository loginRepository;
    ProfileRepository profileRepository;
    Preference preference;

    public LoginViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);
        loginRepository = LoginRepository.getInstance(application);
        profileRepository = ProfileRepository.getInstance(application);
    }

    public LiveData<LoginResponse> getMessageResponseLiveData(String email, String password) {
        return loginRepository.getMutableLoginResponse(email, password);
    }

    public LiveData<ProfileValidityResponse> getProfileValidityResponseMutableLiveData() {
        return profileRepository.getProfileValidityResponseMutableLiveData(preference.getAccessToken());
    }

    public void switchActivity(LoginResponse loginResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            if (!loginResponse.isError()) {
                if (new DecodeJwt(loginResponse.getToken().getAccessToken()).getData().getPermissions().getType().equals("student")) {
                    preference.setType(new DecodeJwt(loginResponse.getToken().getAccessToken()).getData().getPermissions().getType());
                    preference.setAccessToken(loginResponse.getToken().getAccessToken());
                    preference.setRefreshToken(loginResponse.getToken().getRefreshToken());

                    Intent intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    getApplication().getApplicationContext().startActivity(intent);
                }
            } else {
                Log.d("loginResponse", loginResponse.getMessage() + " " + loginResponse.isError());
                Toast.makeText(getApplication().getApplicationContext(), "" + loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
            }

        }, 250);
    }

    public void switchActivity(LoginResponse loginResponse, ProfileValidityResponse profileValidityResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            Intent intent;
            if (new DecodeJwt(loginResponse.getToken().getAccessToken()).getData().getPermissions().getType().equals("student")) {
                preference.setType(new DecodeJwt(loginResponse.getToken().getAccessToken()).getData().getPermissions().getType());
                preference.setAccessToken(loginResponse.getToken().getAccessToken());
                preference.setRefreshToken(loginResponse.getToken().getRefreshToken());
            }
            if (!profileValidityResponse.isSuccess() || !profileValidityResponse.isCompleted()) {
                intent = new Intent(getApplication().getApplicationContext(), EditProfileActivity.class);
                intent.putExtra("fetch_profile_data", false);
            } else {
                intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
            }
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            getApplication().getApplicationContext().startActivity(intent);
        }, 250);
    }
}
