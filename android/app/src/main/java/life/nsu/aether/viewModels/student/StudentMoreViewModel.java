/*
 * StudentMoreViewModel Created by Samiur Prapon
 * Last modified  8/15/21, 1:11 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.student;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.Objects;

import life.nsu.aether.repositories.LogoutRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import life.nsu.aether.views.authentication.LoginActivity;

public class StudentMoreViewModel extends AndroidViewModel {
//    web services
    LogoutRepository logoutRepository;

//    local data storage
    Preference preference;

    public StudentMoreViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);
        logoutRepository = LogoutRepository.getInstance(application);
    }

    public LiveData<MessageResponse> getDeAuthResponse() {
        return logoutRepository.getDeAuthResponseMutableLiveData(preference.getAccessToken());
    }

    public void switchActivity(MessageResponse messageResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            if (messageResponse.isSuccess()) {
                preference.clearAuth();
                Intent intent = new Intent(getApplication().getApplicationContext(), LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                getApplication().getApplicationContext().startActivity(intent);
            } else {
                Toast.makeText(getApplication().getApplicationContext(), "request failed!", Toast.LENGTH_SHORT).show();
            }

        }, 250);
    }
}
