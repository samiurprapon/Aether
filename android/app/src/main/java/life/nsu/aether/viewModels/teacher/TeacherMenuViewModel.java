/*
 * TeacherMenuViewModel Created by Mahfuj Ahmed Jim
 * Last modified  3/6/23, 7:40 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.teacher;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.Objects;

import life.nsu.aether.repositories.authorization.LogoutRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import life.nsu.aether.views.authentication.LoginActivity;

public class TeacherMenuViewModel extends AndroidViewModel {

    LogoutRepository logoutRepository;
    Preference preference;

    public TeacherMenuViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);
        logoutRepository = LogoutRepository.getInstance(application);
    }

    public LiveData<MessageResponse> getDeAuthResponse() {
        return logoutRepository.getDeAuthResponseMutableLiveData(preference.getAccessToken(), preference.getRefreshToken());
    }

    public void switchActivity(MessageResponse messageResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            if (!messageResponse.isError()) {
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
