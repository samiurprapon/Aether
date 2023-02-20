/*
 * TeacherProfileRepository Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 3:09 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.repositories.teacher;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import life.nsu.aether.models.Student;
import life.nsu.aether.models.Teacher;
import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.responses.TeacherProfileDetailsResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TeacherProfileRepository {

    Application application;
    MutableLiveData<TeacherProfileDetailsResponse> teacherProfileDetailsResponseMutableLiveData;
    MutableLiveData<TeacherProfileDetailsResponse> teacherProfileUpdateDetailsResponseMutableLiveData;

    private static TeacherProfileRepository profileRepository = null;

    public synchronized static TeacherProfileRepository getInstance(Application application) {
        if (profileRepository == null) {
            profileRepository = new TeacherProfileRepository(application);
        }

        return profileRepository;
    }

    private TeacherProfileRepository(Application application) {
        this.application = application;

        teacherProfileDetailsResponseMutableLiveData = new MutableLiveData<>();
        teacherProfileUpdateDetailsResponseMutableLiveData = new MutableLiveData<>();

    }

    public MutableLiveData<TeacherProfileDetailsResponse> getTeacherProfileDetailsResponseMutableLiveData(String accessToken) {
        Call<TeacherProfileDetailsResponse> call = NetworkingService.getInstance()
                .getRoute()
                .getTeacherProfile(accessToken);

        call.enqueue(new Callback<TeacherProfileDetailsResponse>() {
            @Override
            public void onResponse(@NonNull Call<TeacherProfileDetailsResponse> call, @NonNull Response<TeacherProfileDetailsResponse> response) {
                if (response.body() != null) {
                    teacherProfileDetailsResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    teacherProfileDetailsResponseMutableLiveData.postValue(new TeacherProfileDetailsResponse(false, response.message(), new Teacher()));
                }
            }

            @Override
            public void onFailure(@NonNull Call<TeacherProfileDetailsResponse> call, @NonNull Throwable t) {
                teacherProfileDetailsResponseMutableLiveData.postValue(new TeacherProfileDetailsResponse(false, t.getMessage(), new Teacher()));
            }
        });

        return teacherProfileDetailsResponseMutableLiveData;
    }

}
