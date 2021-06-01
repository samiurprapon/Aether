/*
 * RegistrationActivityViewModel Created by Samiur Prapon
 * Last modified  6/1/21 9:36 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import life.nsu.aether.repositories.RegisterRepository;
import life.nsu.aether.utils.networking.responses.MessageResponse;

public class RegistrationActivityViewModel extends AndroidViewModel {

    RegisterRepository registerRepository;
    private LiveData<MessageResponse> messageResponseLiveData;

    public RegistrationActivityViewModel(@NonNull Application application) {
        super(application);

        registerRepository = RegisterRepository.getInstance(application);
    }

    public void initialize() {
        messageResponseLiveData = registerRepository.getMutableMessage();
    }

    public void register(String email, String password, String type) {
        registerRepository.register(email, password, type);
    }

    public LiveData<MessageResponse> getMessageResponseLiveData() {
        return messageResponseLiveData;
    }
}
