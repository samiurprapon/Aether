/*
 * RegisterRepository Created by Samiur Prapon
 * Last modified  2/6/23, 1:32 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.repositories.authorization;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import java.io.IOException;
import java.lang.annotation.Annotation;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.RegistrationRequest;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
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

    public MutableLiveData<MessageResponse> getMutableMessage(String email, String password, String type) {
        Call<MessageResponse> call = NetworkingService.getInstance()
                .getRoute()
                .registration(new RegistrationRequest(email, password, type));

        call.enqueue(new Callback<MessageResponse>() {
            @Override
            public void onResponse(@NonNull Call<MessageResponse> call, @NonNull Response<MessageResponse> response) {
                if (response.body() != null) {
                    mutableMessage.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    Converter<ResponseBody, MessageResponse> converter = NetworkingService.getInstance().getRetrofit()
                            .responseBodyConverter(MessageResponse.class, new Annotation[0]);

                    try {
                        MessageResponse errorResponse = converter.convert(response.errorBody());
                        mutableMessage.postValue(errorResponse);
                    } catch (IOException e) {
                        mutableMessage.postValue(new MessageResponse(false, e.getMessage()));
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<MessageResponse> call, @NonNull Throwable t) {
//                Log.d("messageResponse", "onFailure: " + t.getMessage());
                mutableMessage.postValue(new MessageResponse(false, t.getMessage()));
            }
        });

        return mutableMessage;
    }
}

