/*
 * TeacherExamFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 1:49 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.exam;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import life.nsu.aether.R;
import life.nsu.aether.views.teacher.classroom.TeacherClassroomFragment;

public class TeacherExamFragment extends Fragment {

    static TeacherExamFragment fragment = null;

    public static TeacherExamFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherExamFragment.class) {
                if (fragment == null) {
                    return new TeacherExamFragment();
                }
            }
        }
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_exam, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

}