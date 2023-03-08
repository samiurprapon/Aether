/*
 * StudentCourseRepository Created by Mahfuj Ahmed Jim
 * Last modified  3/8/23, 12:24 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.repositories.student;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.StudentCourseRequest;
import life.nsu.aether.utils.networking.responses.StudentCourseResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class StudentCourseRepository {

    Application application;
    MutableLiveData<StudentCourseResponse> enrollCourseValidityResponseMutableLiveData;

    private static StudentCourseRepository courseRepository = null;

    public synchronized static StudentCourseRepository getInstance(Application application) {
        if (courseRepository == null) {
            courseRepository = new StudentCourseRepository(application);
        }
        return courseRepository;
    }

    private StudentCourseRepository(Application application) {
        this.application = application;

        enrollCourseValidityResponseMutableLiveData = new MutableLiveData<>();

    }

    public MutableLiveData<StudentCourseResponse> postStudentEnrollCourseResponseMutableLiveData(String accessToken, String enrollCode){
        Call<StudentCourseResponse> call = NetworkingService.getInstance()
                .getRoute()
                .postEnrollStudentCourse(accessToken, new StudentCourseRequest(enrollCode));

        call.enqueue(new Callback<StudentCourseResponse>() {
            @Override
            public void onResponse(Call<StudentCourseResponse> call, Response<StudentCourseResponse> response) {
                if (response.body() != null) {
                    enrollCourseValidityResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    enrollCourseValidityResponseMutableLiveData.postValue(new StudentCourseResponse(false));
                }
            }

            @Override
            public void onFailure(Call<StudentCourseResponse> call, Throwable t) {
                enrollCourseValidityResponseMutableLiveData.postValue(new StudentCourseResponse(false));
            }
        });

        return  enrollCourseValidityResponseMutableLiveData;
    }
}
