/*
 * StudentExamFragment Created by Samiur Prapon
 * Last modified  8/4/21, 5:38 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.student.examination;

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

public class StudentExamFragment extends Fragment {

    MaterialButton mAssignedTasks;
    MaterialButton mSubmittedTasks;

    static StudentExamFragment fragment = null;

    public static StudentExamFragment newInstance() {
        if (fragment == null) {
            synchronized (StudentExamFragment.class) {
                if (fragment == null) {
                    return new StudentExamFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_student_exam, container, false);
    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        mAssignedTasks = view.findViewById(R.id.mb_assigned_tasks);
        mSubmittedTasks = view.findViewById(R.id.mb_already_submitted);

        mAssignedTasks.setEnabled(false);


        mSubmittedTasks.setOnClickListener(v -> {
            mSubmittedTasks.setEnabled(false);
            mAssignedTasks.setEnabled(true);

            mAssignedTasks.setTextColor(Color.parseColor("#B3B3B3"));
            mSubmittedTasks.setTextColor(Color.parseColor("#000000"));
        });

        mAssignedTasks.setOnClickListener(v -> {
            mAssignedTasks.setEnabled(false);
            mSubmittedTasks.setEnabled(true);

            mSubmittedTasks.setTextColor(Color.parseColor("#B3B3B3"));
            mAssignedTasks.setTextColor(Color.parseColor("#000000"));
        });
    }
}