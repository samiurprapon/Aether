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

import com.google.gson.Gson;

import java.util.Objects;

import life.nsu.aether.models.Student;
import life.nsu.aether.repositories.student.StudentProfileRepository;
import life.nsu.aether.repositories.authorization.LoginRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;
import life.nsu.aether.views.student.StudentHomeActivity;

public class LoginViewModel extends AndroidViewModel {
    LoginRepository loginRepository;
    StudentProfileRepository profileRepository;
    Preference preference;
    Gson gson;

    public LoginViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);
        loginRepository = LoginRepository.getInstance(application);
        profileRepository = StudentProfileRepository.getInstance(application);
    }

    public LiveData<LoginResponse> getMessageResponseLiveData(String email, String password) {
        return loginRepository.getMutableLoginResponse(email, password);
    }

    public LiveData<ProfileValidityResponse> getProfileValidityResponseMutableLiveData() {
        return profileRepository.getProfileValidityResponseMutableLiveData(preference.getAccessToken());
    }

    public void switchActivity(LoginResponse loginResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            Log.d("LoginViewModel", "switchActivity: " + loginResponse.getTokens().getAccessToken());

            if (!loginResponse.isError()) {

//                slice token
                if (loginResponse.getTokens().getAccessToken() != null) {
                    preference.setAccessToken(loginResponse.getTokens().getAccessToken());
                    preference.setRefreshToken(loginResponse.getTokens().getRefreshToken());

                    gson = new Gson();
                    Student student = gson.fromJson(preference.getDecodedAccessToken(), Student.class);


//                    Log.d("LoginViewModel", "switchActivity: " + loginResponse.getTokens().getAccessToken());
//                    Log.d("LoginViewModel", "Decode : " + student.getUser().toString());
//                    Log.d("LoginViewModel", "Decode-user : " + student.getPermission().getType());

                    if (student.getPermission().getType().equals("student")) {

                        Intent intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        getApplication().getApplicationContext().startActivity(intent);
                    } else {
//                        Not allowed to login from app right now
                        Toast.makeText(getApplication().getApplicationContext(), "Not allowed to login from app right now", Toast.LENGTH_SHORT).show();
                    }

                }
            } else {
                Log.d("loginResponse", loginResponse.getMessage() + " " + loginResponse.getMessage());
                Toast.makeText(getApplication().getApplicationContext(), "" + loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
            }

        }, 250);
    }

//    public void switchActivity(LoginResponse loginResponse, ProfileValidityResponse profileValidityResponse) {
//        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
//            Intent intent;
//            if(loginResponse.getType().equals("student")) {
//                preference.setType(loginResponse.getType());
//                preference.setAccessToken(loginResponse.getAccessToken());
//                preference.setRefreshToken(loginResponse.getRefreshToken());
//            }
//            if (!profileValidityResponse.isSuccess() || !profileValidityResponse.isCompleted()) {
//                intent = new Intent(getApplication().getApplicationContext(), EditProfileActivity.class);
//                intent.putExtra("fetch_profile_data", false);
//            } else{
//                intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
//            }
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//            getApplication().getApplicationContext().startActivity(intent);
//        }, 250);
//    }
}
