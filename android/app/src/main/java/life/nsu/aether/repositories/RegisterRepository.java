/*
 * RegisterRepository Created by Samiur Prapon
 * Last modified  6/1/21 11:41 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.repositories;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.RegistrationRequest;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterRepository {

    Application application;

    MutableLiveData<MessageResponse> mutableMessage;

    private static RegisterRepository registerRepository = null;

    public synchronized static RegisterRepository getInstance(Application application) {
        if (registerRepository == null) {
            registerRepository = new RegisterRepository(application);
        }

        return registerRepository;
    }

    private RegisterRepository(Application application) {
        this.application = application;

        mutableMessage = new MutableLiveData<>();
    }

    public MutableLiveData<MessageResponse>  getMutableMessage(String email, String password, String type) {
        Call<MessageResponse> call = NetworkingService.getInstance()
                .getRoute()
                .registration(new RegistrationRequest(email, password, type));

        call.enqueue(new Callback<MessageResponse>() {
            @Override
            public void onResponse(@NonNull Call<MessageResponse> call, @NonNull Response<MessageResponse> response) {
                if (response.code() == 201 && response.body() != null) {
                    mutableMessage.postValue(response.body());
                }
            }

            @Override
            public void onFailure(@NonNull Call<MessageResponse> call, @NonNull Throwable t) {
                Log.d("messageResponse", "onFailure: "+t.getMessage());
                mutableMessage.postValue(new MessageResponse(false, "Failed to register"));
            }
        });

        return mutableMessage;
    }
}

