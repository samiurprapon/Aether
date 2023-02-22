/*
 * TeacherAllCoursesFragment Created by Mshfuj Ahmed Jim
 * Last modified  2/22/23, 1:00 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import life.nsu.aether.R;
import life.nsu.aether.utils.networking.responses.TeacherCoursesResponse;
import life.nsu.aether.viewModels.teacher.TeacherCourseViewModel;

public class TeacherAllCoursesFragment extends Fragment {

    static TeacherAllCoursesFragment fragment = null;
    private TeacherCourseViewModel viewModel;

    public static TeacherAllCoursesFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherAllCoursesFragment.class) {
                if (fragment == null) {
                    return new TeacherAllCoursesFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_all_courses, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(getActivity()).get(TeacherCourseViewModel.class);

        // Fetch all courses data
        viewModel.getTeacherCourseResponseMutableLiveData().observe(getActivity(), this::changeUiAccordingToTeacherProfileData);

    }

    private void changeUiAccordingToTeacherProfileData(TeacherCoursesResponse teacherCoursesResponse){

    }

}