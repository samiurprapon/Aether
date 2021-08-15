/*
 * StudentMoreFragment Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.student.options;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.card.MaterialCardView;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.viewModels.student.StudentMoreViewModel;


public class StudentMoreFragment extends Fragment {

    static StudentMoreFragment fragment = null;
    StudentMoreViewModel viewModel;
    CustomProgressBar progressBar;

    MaterialCardView mLogout;
    MaterialCardView mAppSettings;
    MaterialCardView mTerms;
    MaterialCardView mPrivacy;

    public static StudentMoreFragment newInstance() {
        if (fragment == null) {
            synchronized (StudentMoreFragment.class) {
                if (fragment == null) {
                    return new StudentMoreFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_student_more, container, false);
    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

//        view model initialize
        viewModel = new ViewModelProvider(this).get(StudentMoreViewModel.class);

//        initialize progress showing dialog
        progressBar = new CustomProgressBar(getContext());

        mLogout = view.findViewById(R.id.mcv_logout);
        mAppSettings = view.findViewById(R.id.mcv_app_settings);
        mTerms = view.findViewById(R.id.mcv_terms_conditions);
        mPrivacy = view.findViewById(R.id.mcv_privacy_policy);

        mLogout.setOnClickListener(v -> {
            progressBar.show("Logging out ...");

            new Handler(Looper.myLooper()).postDelayed(() -> viewModel.getDeAuthResponse().observe(getViewLifecycleOwner(), deAuthResponse -> {
                progressBar.hide();

                viewModel.switchActivity(deAuthResponse);
            }), 500);
        });

    }

}