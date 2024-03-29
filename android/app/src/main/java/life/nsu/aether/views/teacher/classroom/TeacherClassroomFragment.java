/*
 * TeacherClassroomFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 1:46 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.classroom;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import life.nsu.aether.R;
import life.nsu.aether.views.teacher.courses.TeacherCourseFragment;

public class TeacherClassroomFragment extends Fragment {

    static TeacherClassroomFragment fragment = null;

    public static TeacherClassroomFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherClassroomFragment.class) {
                if (fragment == null) {
                    return new TeacherClassroomFragment();
                }
            }
        }
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_classroom, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

}