/*
 * TeacherCourseRepository Created by Mahfuj Ahmed Jim
 * Last modified  2/22/23, 1:56 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.repositories.teacher;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;

import life.nsu.aether.utils.networking.NetworkingService;
import life.nsu.aether.utils.networking.requests.TeacherCourseRequest;
import life.nsu.aether.utils.networking.responses.TeacherCoursesResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TeacherCourseRepository {

    Application application;
    MutableLiveData<TeacherCoursesResponse> teacherCourseResponseMutableLiveData;
    MutableLiveData<TeacherCoursesResponse> teacherDeleteCourseResponseMutableLiveData;
    MutableLiveData<TeacherCoursesResponse> teacherArchiveCourseResponseMutableLiveData;

    private static TeacherCourseRepository courseRepository = null;

    public synchronized static TeacherCourseRepository getInstance(Application application) {
        if (courseRepository == null) {
            courseRepository = new TeacherCourseRepository(application);
        }

        return courseRepository;
    }

    private TeacherCourseRepository(Application application) {
        this.application = application;
        teacherCourseResponseMutableLiveData = new MutableLiveData<>();
    }

    public MutableLiveData<TeacherCoursesResponse> getTeacherCourseResponseMutableLiveData(String accessToken){
        Call<TeacherCoursesResponse> call = NetworkingService.getInstance()
                .getRoute()
                .getTeacherCourses(accessToken/*, true*/);

        call.enqueue(new Callback<TeacherCoursesResponse>() {
            @Override
            public void onResponse(Call<TeacherCoursesResponse> call, Response<TeacherCoursesResponse> response) {
                if (response.body() != null) {
                    teacherCourseResponseMutableLiveData.postValue(response.body());
                }

                if (response.errorBody() != null) {
                    teacherCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
                }
            }

            @Override
            public void onFailure(Call<TeacherCoursesResponse> call, Throwable t) {
                teacherCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
            }
        });

        return  teacherCourseResponseMutableLiveData;
    }

    public MutableLiveData<TeacherCoursesResponse> deleteTeacherCourseResponseMutableLiveData(String accessToken, String courseId){
        Call<TeacherCoursesResponse> call = NetworkingService.getInstance()
                .getRoute()
                .deleteTeacherCourses(accessToken, new TeacherCourseRequest(courseId));

        call.enqueue(new Callback<TeacherCoursesResponse>() {
            @Override
            public void onResponse(Call<TeacherCoursesResponse> call, Response<TeacherCoursesResponse> response) {
                if (response.body() != null) {
                    try{
                        teacherDeleteCourseResponseMutableLiveData.postValue(response.body());
                    }catch (Exception e){

                    }
                }

                if (response.errorBody() != null) {
                    teacherDeleteCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
                }
            }

            @Override
            public void onFailure(Call<TeacherCoursesResponse> call, Throwable t) {
                teacherDeleteCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
            }
        });

        return  teacherDeleteCourseResponseMutableLiveData;
    }

    public MutableLiveData<TeacherCoursesResponse> archiveTeacherCourseResponseMutableLiveData(String accessToken, String courseId){
        Call<TeacherCoursesResponse> call = NetworkingService.getInstance()
                .getRoute()
                .archiveTeacherCourses(accessToken, new TeacherCourseRequest(courseId, true));

        call.enqueue(new Callback<TeacherCoursesResponse>() {
            @Override
            public void onResponse(Call<TeacherCoursesResponse> call, Response<TeacherCoursesResponse> response) {
                if (response.body() != null) {
                    try{
                        teacherArchiveCourseResponseMutableLiveData.postValue(response.body());
                    }catch (Exception e){

                    }
                }

                if (response.errorBody() != null) {
                    teacherArchiveCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
                }
            }

            @Override
            public void onFailure(Call<TeacherCoursesResponse> call, Throwable t) {
                teacherArchiveCourseResponseMutableLiveData.postValue(new TeacherCoursesResponse(false));
            }
        });

        return  teacherArchiveCourseResponseMutableLiveData;
    }

}
