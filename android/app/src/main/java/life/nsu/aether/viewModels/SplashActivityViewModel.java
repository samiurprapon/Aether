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

import life.nsu.aether.repositories.RefreshRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import life.nsu.aether.views.LoginActivity;
import life.nsu.aether.views.home.StudentHomeActivity;

public class SplashActivityViewModel extends AndroidViewModel {

    RefreshRepository refreshRepository;
    Preference preference;

    public SplashActivityViewModel(@NonNull Application application) {
        super(application);


        preference = new Preference(application);
        refreshRepository = RefreshRepository.getInstance(application);
    }

    public LiveData<RefreshResponse> getRefreshResponseMutableLiveData() {
        return refreshRepository.getRefreshResponseMutableLiveData(preference.getRefreshToken());
    }

    public void switchActivity(RefreshResponse refreshResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            Intent intent;

            if (!refreshResponse.isSuccess()) {
                intent = new Intent(getApplication().getApplicationContext(), LoginActivity.class);
            } else {
                preference.setAccessToken(refreshResponse.getAccessToken());

                intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
            }

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            getApplication().getApplicationContext().startActivity(intent);
        }, 250);
    }
}
