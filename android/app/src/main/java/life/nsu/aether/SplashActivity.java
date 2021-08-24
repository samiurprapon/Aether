
/*
 * SplashActivity Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import life.nsu.aether.viewModels.SplashViewModel;

public class SplashActivity extends AppCompatActivity {

    SplashViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        viewModel = new ViewModelProvider(this).get(SplashViewModel.class);

        viewModel.getRefreshResponseMutableLiveData().observe(this, refreshResponse -> {
            if(!refreshResponse.isSuccess()){
                viewModel.switchActivity(refreshResponse);
            }else{
                viewModel.getProfileValidityResponseMutableLiveData().observe(this, profileValidityResponse -> {
                    viewModel.switchActivity(profileValidityResponse);
                });
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}