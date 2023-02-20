/*
 * TeacherProfileFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 1:51 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.profile;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.w3c.dom.Text;

import life.nsu.aether.R;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import life.nsu.aether.utils.networking.responses.TeacherProfileDetailsResponse;
import life.nsu.aether.viewModels.student.StudentProfileViewModel;
import life.nsu.aether.viewModels.teacher.TeacherProfileViewModel;
import life.nsu.aether.views.teacher.exam.TeacherExamFragment;

public class TeacherProfileFragment extends Fragment {

    static TeacherProfileFragment fragment = null;
    TextView mName;
    TextView mInitial;
    TextView mSex;
    TeacherProfileViewModel teacherProfileViewModel;

    public static TeacherProfileFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherProfileFragment.class) {
                if (fragment == null) {
                    return new TeacherProfileFragment();
                }
            }
        }
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        teacherProfileViewModel = new ViewModelProvider(this).get(TeacherProfileViewModel.class);
        mName = view.findViewById(R.id.tv_name);
        mInitial = view.findViewById(R.id.tv_initial);
        mSex = view.findViewById(R.id.tv_sex);

        // Fetch students previous data and place them on ui for editing profile
        teacherProfileViewModel.getTeacherProfileDetailsResponseMutableLiveData().observe(getActivity(), this::changeUiAccordingToStudentsProfileData);

    }

    private void changeUiAccordingToStudentsProfileData(TeacherProfileDetailsResponse teacherProfileDetailsResponse) {
        mInitial.setText(teacherProfileDetailsResponse.getTeacher().getInitial());
    }

}