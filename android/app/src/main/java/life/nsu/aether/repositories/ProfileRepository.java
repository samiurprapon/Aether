/*
 * ProfileRepository Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.repositories;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.io.IOException;
import java.lang.annotation.Annotation;

import life.nsu.aether.models.Student;
import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.ProfileUpdateRequest;
import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
import retrofit2.Response;

public class ProfileRepository {
    Application application;
    MutableLiveData<ProfileValidityResponse> profileValidityResponseMutableLiveData;
    MutableLiveData<StudentProfileDetailsResponse> studentProfileDetailsResponseMutableLiveData;
    MutableLiveData<StudentProfileDetailsResponse> studentProfileUpdateDetailsResponseMutableLiveData;


    private static ProfileRepository profileRepository = null;

    public synchronized static ProfileRepository getInstance(Application application) {
        if (profileRepository == null) {
            profileRepository = new ProfileRepository(application);
        }

        return profileRepository;
    }

    private ProfileRepository(Application application) {
        this.application = application;

        profileValidityResponseMutableLiveData = new MutableLiveData<>();
        studentProfileDetailsResponseMutableLiveData = new MutableLiveData<>();
        studentProfileUpdateDetailsResponseMutableLiveData = new MutableLiveData<>();

    }

    public MutableLiveData<ProfileValidityResponse> getProfileValidityResponseMutableLiveData(String refreshToken) {
        Call<ProfileValidityResponse> call = NetworkingService.getInstance()
                .getRoute()
                .validateStudentProfile(refreshToken);

        call.enqueue(new Callback<ProfileValidityResponse>() {
            @Override
            public void onResponse(@NonNull Call<ProfileValidityResponse> call, @NonNull Response<ProfileValidityResponse> response) {
                if (response.body() != null) {
                    profileValidityResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    profileValidityResponseMutableLiveData.postValue(new ProfileValidityResponse(false, response.message(), false));
                }
            }

            @Override
            public void onFailure(@NonNull Call<ProfileValidityResponse> call, @NonNull Throwable t) {
                profileValidityResponseMutableLiveData.postValue(new ProfileValidityResponse(false, t.getMessage(), false));
            }
        });

        return profileValidityResponseMutableLiveData;
    }

    public MutableLiveData<StudentProfileDetailsResponse> getStudentProfileDetailsResponseMutableLiveData(String refreshToken) {
        Call<StudentProfileDetailsResponse> call = NetworkingService.getInstance()
                .getRoute()
                .getStudentProfile(refreshToken);

        call.enqueue(new Callback<StudentProfileDetailsResponse>() {
            @Override
            public void onResponse(@NonNull Call<StudentProfileDetailsResponse> call, @NonNull Response<StudentProfileDetailsResponse> response) {
                if (response.body() != null) {
                    studentProfileDetailsResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    studentProfileDetailsResponseMutableLiveData.postValue(new StudentProfileDetailsResponse(false, response.message(), new Student()));
                }
            }

            @Override
            public void onFailure(@NonNull Call<StudentProfileDetailsResponse> call, @NonNull Throwable t) {
                studentProfileDetailsResponseMutableLiveData.postValue(new StudentProfileDetailsResponse(false, t.getMessage(), new Student()));
            }
        });

        return studentProfileDetailsResponseMutableLiveData;
    }

    public LiveData<StudentProfileDetailsResponse> getStudentProfileUpdateResponseLiveData(String refreshToken, String name, String gender, String studentId) {
        Call<StudentProfileDetailsResponse> call = NetworkingService.getInstance()
                .getRoute()
                .updateProfile(refreshToken, new ProfileUpdateRequest(Integer.parseInt(studentId), name, gender));

        call.enqueue(new Callback<StudentProfileDetailsResponse>() {
            @Override
            public void onResponse(@NonNull Call<StudentProfileDetailsResponse> call, @NonNull Response<StudentProfileDetailsResponse> response) {

                if (response.body() != null) {
                    studentProfileUpdateDetailsResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    Log.e("Error", String.valueOf(response.code()));
                    try {
                        Log.e("Error", response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    studentProfileUpdateDetailsResponseMutableLiveData.postValue(new StudentProfileDetailsResponse(false, response.message(), new Student()));
                }
            }

            @Override
            public void onFailure(@NonNull Call<StudentProfileDetailsResponse> call, @NonNull Throwable t) {
                studentProfileUpdateDetailsResponseMutableLiveData.postValue(new StudentProfileDetailsResponse(false, t.getMessage(), new Student()));
            }
        });

        return studentProfileUpdateDetailsResponseMutableLiveData;
    }
}
