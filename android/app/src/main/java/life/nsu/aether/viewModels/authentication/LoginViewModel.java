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
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import life.nsu.aether.views.student.StudentHomeActivity;

public class LoginViewModel extends AndroidViewModel {
    LoginRepository loginRepository;
    Preference preference;

    public LoginViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);
        loginRepository = LoginRepository.getInstance(application);
    }

    public LiveData<LoginResponse> getMessageResponseLiveData(String email, String password) {
        return loginRepository.getMutableLoginResponse(email, password);
    }

    public void switchActivity(LoginResponse loginResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {

            if (loginResponse.isSuccess()) {
                if(loginResponse.getType().equals("student")) {
                    preference.setType(loginResponse.getType());
                    preference.setAccessToken(loginResponse.getAccessToken());
                    preference.setRefreshToken(loginResponse.getRefreshToken());

                    Intent intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    getApplication().getApplicationContext().startActivity(intent);
                }
            } else {
                Log.d("loginResponse", loginResponse.getMessage()+" "+loginResponse.isSuccess());
                Toast.makeText(getApplication().getApplicationContext(), ""+loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
            }

        }, 250);
    }
}
