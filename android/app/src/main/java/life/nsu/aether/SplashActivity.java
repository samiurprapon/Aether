
/*
 * SplashActivity Created by Samiur Prapon
 * Last modified  5/29/21 5:36 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import life.nsu.aether.viewModels.SplashActivityViewModel;

public class SplashActivity extends AppCompatActivity {

    SplashActivityViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        viewModel = new ViewModelProvider(this).get(SplashActivityViewModel.class);

    }
}