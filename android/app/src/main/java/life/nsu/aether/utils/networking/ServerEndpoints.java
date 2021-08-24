/*
 * ServerEndpoints Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking;

import life.nsu.aether.utils.networking.requests.LoginRequest;
import life.nsu.aether.utils.networking.requests.ProfileUpdateRequest;
import life.nsu.aether.utils.networking.requests.RegistrationRequest;
import life.nsu.aether.utils.networking.responses.LoginResponse;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;
import life.nsu.aether.utils.networking.responses.RefreshResponse;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ServerEndpoints {

    @POST("auth/register")
    Call<MessageResponse> registration(@Body RegistrationRequest request);

    @POST("auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("auth/refresh")
    Call<RefreshResponse> refreshSession(@Header("Authorization") String refreshToken);

    @POST("auth/logout")
    Call<MessageResponse> deAuthentication(@Header("Authorization") String accessToken);

    @GET("student/valid")
    Call<ProfileValidityResponse> validateStudentProfile(@Header("Authorization") String accessToken);

    @POST("student")
    Call<StudentProfileDetailsResponse> updateProfile(@Header("Authorization") String accessToken, @Body ProfileUpdateRequest request);

    @GET("student")
    Call<StudentProfileDetailsResponse> getStudentProfile(@Header("Authorization") String accessToken);

}