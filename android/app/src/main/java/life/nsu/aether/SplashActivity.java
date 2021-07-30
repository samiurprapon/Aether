
/*
 * SplashActivity Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import life.nsu.aether.viewModels.SplashActivityViewModel;
import life.nsu.aether.views.home.StudentHomeActivity;

public class SplashActivity extends AppCompatActivity {

    SplashActivityViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        viewModel = new ViewModelProvider(this).get(SplashActivityViewModel.class);

        // Temporary redirect for test purposes
        startActivity(new Intent(SplashActivity.this, StudentHomeActivity.class).setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK));
    }
}