/*
 * StudentClassroomFragment Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.button.MaterialButton;

import life.nsu.aether.R;


public class StudentClassroomFragment extends Fragment {

    MaterialButton mClasses;
    MaterialButton mRecordings;

    static StudentClassroomFragment fragment = null;

    public static StudentClassroomFragment newInstance() {
        if (fragment == null) {
            synchronized (StudentClassroomFragment.class) {
                if (fragment == null) {
                    return new StudentClassroomFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_student_classroom, container, false);
    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        mClasses = view.findViewById(R.id.mb_today_class);
        mRecordings = view.findViewById(R.id.mb_class_recording);

        mClasses.setEnabled(false);


        mRecordings.setOnClickListener(v -> {
            mRecordings.setEnabled(false);
            mClasses.setEnabled(true);

            mClasses.setTextColor(Color.parseColor("#B3B3B3"));
            mRecordings.setTextColor(Color.parseColor("#000000"));
        });

        mClasses.setOnClickListener(v -> {
            mClasses.setEnabled(false);
            mRecordings.setEnabled(true);

            mRecordings.setTextColor(Color.parseColor("#B3B3B3"));
            mClasses.setTextColor(Color.parseColor("#000000"));
        });
    }
}