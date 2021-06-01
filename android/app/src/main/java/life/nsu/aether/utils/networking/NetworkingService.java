/*
 * NetworkingService Created by Samiur Prapon
 * Last modified  6/1/21 5:49 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking;

import life.nsu.aether.utils.NetworkCredentials;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkingService {

    private static NetworkingService mInstance = null;
    Retrofit retrofit;

    public static synchronized NetworkingService getInstance() {
        if (mInstance == null) {
            mInstance = new NetworkingService();
        }

        return mInstance;
    }

    public ServerEndpoints getRoute() {
        return retrofit.create(ServerEndpoints.class);
    }

    private NetworkingService() {
        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .addInterceptor(
                        chain -> {
                            Request original = chain.request();

                            Request.Builder requestBuilder = original.newBuilder()
                                    .method(original.method(), original.body());

                            Request request = requestBuilder.build();
                            return chain.proceed(request);
                        }
                ).build();

        retrofit = new Retrofit.Builder()
                .baseUrl(NetworkCredentials.SERVER_BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(okHttpClient)
                .build();
    }
}
