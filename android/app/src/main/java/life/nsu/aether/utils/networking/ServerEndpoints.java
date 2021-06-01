/*
 * ServerEndpoints Created by Samiur Prapon
 * Last modified  6/1/21 7:42 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking;

import life.nsu.aether.utils.networking.requests.RegistrationRequest;
import life.nsu.aether.utils.networking.responses.MessageResponse;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ServerEndpoints {

    @POST("auth/register")
    Call<MessageResponse> registration(@Body RegistrationRequest request);


}