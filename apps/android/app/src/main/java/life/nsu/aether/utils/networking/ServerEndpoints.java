/*
 * ServerEndpoints Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking;

import life.nsu.aether.utils.networking.requests.LoginRequest;
import life.nsu.aether.utils.networking.requests.LogoutRequest;
import life.nsu.aether.utils.networking.requests.ProfileUpdateRequest;
import life.nsu.aether.utils.networking.requests.RegistrationRequest;
import life.nsu.aether.utils.networking.requests.StudentCourseRequest;
import life.nsu.aether.utils.networking.requests.TeacherCourseRequest;
import life.nsu.aether.utils.networking.requests.TeacherProfileUpdateRequest;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import life.nsu.aether.utils.networking.responses.StudentCourseResponse;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import life.nsu.aether.utils.networking.responses.TeacherCoursesResponse;
import life.nsu.aether.utils.networking.responses.TeacherProfileDetailsResponse;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HTTP;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;

public interface ServerEndpoints {

    @POST("auth/signup")
    Call<MessageResponse> registration(@Body RegistrationRequest request);

    @POST("auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("auth/refresh")
    Call<RefreshResponse> refreshSession(@Header("Authorization") String refreshToken);

    @POST("auth/logout")
    Call<MessageResponse> deAuthentication(@Header("Authorization") String accessToken, @Body LogoutRequest request);

    @GET("student/valid")
    Call<ProfileValidityResponse> validateStudentProfile(@Header("Authorization") String accessToken);

    @POST("student")
    Call<StudentProfileDetailsResponse> updateProfile(@Header("Authorization") String accessToken, @Body ProfileUpdateRequest request);

    @GET("student/profile")
    Call<StudentProfileDetailsResponse> getStudentProfile(@Header("Authorization") String accessToken);

    @GET("teacher/profile")
    Call<TeacherProfileDetailsResponse> getTeacherProfile(@Header("Authorization") String accessToken);

    @PUT("teacher/profile")
    Call<TeacherProfileDetailsResponse> postTeacherProfile(@Header("Authorization") String accessToken, @Body TeacherProfileUpdateRequest request);

    @POST("student/courses")
    Call<StudentCourseResponse> postEnrollStudentCourse(@Header("Authorization") String accessToken, @Body StudentCourseRequest request);

    @GET("teacher/courses")
    Call<TeacherCoursesResponse> getTeacherCourses(@Header("Authorization") String accessToken);

    @GET("teacher/courses")
    Call<TeacherCoursesResponse> getTeacherArchiveCourses(@Header("Authorization") String accessToken, @Query("archive") boolean archive);

    @POST("teacher/courses")
    Call<TeacherCoursesResponse> postTeacherCourses(@Header("Authorization") String accessToken, @Body TeacherCourseRequest request);

    @PUT("teacher/courses")
    Call<TeacherCoursesResponse> updateTeacherCourses(@Header("Authorization") String accessToken, @Body TeacherCourseRequest request);

    @HTTP(method = "DELETE", path = "teacher/courses", hasBody = true)
    Call<TeacherCoursesResponse> deleteTeacherCourses(@Header("Authorization") String accessToken, @Body TeacherCourseRequest request);

    @POST("teacher/courses/archive")
    Call<TeacherCoursesResponse> archiveTeacherCourses(@Header("Authorization") String accessToken, @Body TeacherCourseRequest request);

}