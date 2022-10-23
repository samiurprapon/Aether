/*
 * RefreshRepository Created by Samiur Prapon
 * Last modified  8/5/21, 7:48 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.repositories;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import java.io.IOException;
import java.lang.annotation.Annotation;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
import retrofit2.Response;

public class RefreshRepository {
    Application application;
    MutableLiveData<RefreshResponse> refreshResponseMutableLiveData;

    private static RefreshRepository refreshRepository = null;

    public synchronized static RefreshRepository getInstance(Application application) {
        if (refreshRepository == null) {
            refreshRepository = new RefreshRepository(application);
        }

        return refreshRepository;
    }

    private RefreshRepository(Application application) {
        this.application = application;

        refreshResponseMutableLiveData = new MutableLiveData<>();

    }

    public MutableLiveData<RefreshResponse> getRefreshResponseMutableLiveData(String refreshToken) {
        Call<RefreshResponse> call = NetworkingService.getInstance()
                .getRoute()
                .refreshSession(refreshToken);

        call.enqueue(new Callback<RefreshResponse>() {
            @Override
            public void onResponse(@NonNull Call<RefreshResponse> call, @NonNull Response<RefreshResponse> response) {
                if (response.body() != null) {
                    refreshResponseMutableLiveData.postValue(response.body());
//                    Log.d("refreshResponse", response.body().getMessage() + " " + response.body().isError() + " " + response.body().getAccessToken());
                }

                if (response.errorBody() != null) {
                    Converter<ResponseBody, RefreshResponse> converter = NetworkingService.getInstance().getRetrofit()
                            .responseBodyConverter(RefreshResponse.class, new Annotation[0]);

                    try {
                        RefreshResponse errorResponse = converter.convert(response.errorBody());
                        refreshResponseMutableLiveData.postValue(errorResponse);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<RefreshResponse> call, @NonNull Throwable t) {
//                Log.d("refreshResponse", t.getMessage());
                refreshResponseMutableLiveData.postValue(new RefreshResponse(true, t.getMessage(), ""));
            }
        });

        return refreshResponseMutableLiveData;
    }
}
