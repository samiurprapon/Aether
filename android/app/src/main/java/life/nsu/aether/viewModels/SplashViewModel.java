/*
 * SplashActivityViewModel Created by Samiur Prapon
 * Last modified  5/29/21 5:18 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.Objects;

import life.nsu.aether.repositories.authorization.RefreshRepository;
import life.nsu.aether.repositories.student.StudentProfileRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import life.nsu.aether.views.authentication.LoginActivity;
import life.nsu.aether.views.student.StudentHomeActivity;
import life.nsu.aether.views.teacher.TeacherHomeActivity;

public class SplashViewModel extends AndroidViewModel {

    RefreshRepository refreshRepository;
    StudentProfileRepository profileRepository;
    Preference preference;

    public SplashViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);

        refreshRepository = RefreshRepository.getInstance(application);
        profileRepository = StudentProfileRepository.getInstance(application);
    }

    public LiveData<RefreshResponse> getRefreshResponseMutableLiveData() {
        return refreshRepository.getRefreshResponseMutableLiveData(preference.getRefreshToken());
    }

    public void switchActivity(RefreshResponse refreshResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            Intent intent;

            if (preference.getRefreshToken() == null || refreshResponse.getAccessToken() == null) {
                preference.clearAuth();
                intent = new Intent(getApplication().getApplicationContext(), LoginActivity.class);
            } else if (preference.getType().equals("STUDENT")){
                preference.setAccessToken(refreshResponse.getAccessToken());
                intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
            } else {
                preference.setAccessToken(refreshResponse.getAccessToken());
                intent = new Intent(getApplication().getApplicationContext(), TeacherHomeActivity.class);
            }

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            getApplication().getApplicationContext().startActivity(intent);
        }, 250);
    }
}
