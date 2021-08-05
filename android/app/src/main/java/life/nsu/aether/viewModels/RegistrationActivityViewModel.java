/*
 * RegistrationActivityViewModel Created by Samiur Prapon
 * Last modified  6/1/21 9:36 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels;

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

import life.nsu.aether.repositories.RegisterRepository;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import life.nsu.aether.views.LoginActivity;
import life.nsu.aether.views.home.StudentHomeActivity;

public class RegistrationActivityViewModel extends AndroidViewModel {

    RegisterRepository registerRepository;

    public RegistrationActivityViewModel(@NonNull Application application) {
        super(application);

        registerRepository = RegisterRepository.getInstance(application);
    }

    public LiveData<MessageResponse> getMessageResponseLiveData(String email, String password, String type) {
        return registerRepository.getMutableMessage(email, password, type);
    }

    public void switchActivity(MessageResponse messageResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {

            if (messageResponse.isSuccess()) {
                Intent intent = new Intent(getApplication().getApplicationContext(), LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                getApplication().getApplicationContext().startActivity(intent);
            } else {
                Log.d("messageResponse", messageResponse.getMessage()+" "+messageResponse.isSuccess());
                Toast.makeText(getApplication().getApplicationContext(), ""+messageResponse.getMessage(), Toast.LENGTH_SHORT).show();
            }

        }, 250);
    }
}
