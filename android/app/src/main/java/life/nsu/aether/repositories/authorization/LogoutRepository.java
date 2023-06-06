/*
 * LogoutRepository Created by Samiur Prapon
 * Last modified  8/15/21, 11:56 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.repositories.authorization;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import java.io.IOException;
import java.lang.annotation.Annotation;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.LogoutRequest;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
import retrofit2.Response;

public class LogoutRepository {
    Application application;
    MutableLiveData<MessageResponse> deAuthResponseMutableLiveData;

    private static LogoutRepository logoutRepository = null;

    public synchronized static LogoutRepository getInstance(Application application) {
        if (logoutRepository == null) {
            logoutRepository = new LogoutRepository(application);
        }

        return logoutRepository;
    }

    private LogoutRepository(Application application) {
        this.application = application;

        deAuthResponseMutableLiveData = new MutableLiveData<>();
    }


    public MutableLiveData<MessageResponse> getDeAuthResponseMutableLiveData(String accessToken, String refreshToken) {
        Call<MessageResponse> call = NetworkingService.getInstance()
                .getRoute()
                .deAuthentication(accessToken, new LogoutRequest(refreshToken));

        call.enqueue(new Callback<MessageResponse>() {
            @Override
            public void onResponse(@NonNull Call<MessageResponse> call, @NonNull Response<MessageResponse> response) {
                if (response.body() != null) {
                    deAuthResponseMutableLiveData.postValue(response.body());
                    Log.d("refreshResponse", response.body().getMessage() + "  " + response.body().getMessage());
                }

                if (response.errorBody() != null) {
                    Converter<ResponseBody, MessageResponse> converter = NetworkingService.getInstance().getRetrofit()
                            .responseBodyConverter(MessageResponse.class, new Annotation[0]);

                    try {
                        MessageResponse errorResponse = converter.convert(response.errorBody());
                        deAuthResponseMutableLiveData.postValue(errorResponse);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

            }

            @Override
            public void onFailure(@NonNull Call<MessageResponse> call, @NonNull Throwable t) {
//                Log.d("refreshResponse", t.getMessage());
                deAuthResponseMutableLiveData.postValue(new MessageResponse(t.getMessage()));
            }
        });

        return deAuthResponseMutableLiveData;
    }
}
