/*
 * LoginRepository Created by Samiur Prapon
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
import life.nsu.aether.utils.networking.requests.LoginRequest;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
import retrofit2.Response;

public class LoginRepository {
    Application application;

    MutableLiveData<LoginResponse> mutableLoginResponse;

    private static LoginRepository loginRepository = null;

    public synchronized static LoginRepository getInstance(Application application) {
        if (loginRepository == null) {
            loginRepository = new LoginRepository(application);
        }

        return loginRepository;
    }

    private LoginRepository(Application application) {
        this.application = application;

        mutableLoginResponse = new MutableLiveData<>();
    }

    public MutableLiveData<LoginResponse> getMutableLoginResponse(String email, String password) {
        Call<LoginResponse> call = NetworkingService.getInstance()
                .getRoute()
                .login(new LoginRequest(email, password));

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(@NonNull Call<LoginResponse> call, @NonNull Response<LoginResponse> response) {
                if (response.body() != null) {
                    mutableLoginResponse.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    Converter<ResponseBody, LoginResponse> converter = NetworkingService.getInstance().getRetrofit()
                            .responseBodyConverter(LoginResponse.class, new Annotation[0]);

                    try {
                        LoginResponse errorResponse = converter.convert(response.errorBody());
                        mutableLoginResponse.postValue(errorResponse);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<LoginResponse> call, @NonNull Throwable t) {
//                Log.d("messageResponse", "onFailure: " + t.getMessage());
                mutableLoginResponse.postValue(new LoginResponse(t.getMessage()));
            }
        });

        return mutableLoginResponse;
    }

}
