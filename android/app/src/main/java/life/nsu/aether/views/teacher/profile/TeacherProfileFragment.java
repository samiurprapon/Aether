/*
 * TeacherProfileFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 1:51 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.profile;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import life.nsu.aether.R;
import life.nsu.aether.utils.networking.responses.TeacherProfileDetailsResponse;
import life.nsu.aether.viewModels.teacher.TeacherProfileViewModel;
import life.nsu.aether.views.PageActivity;
import life.nsu.aether.views.authentication.RegistrationActivity;

public class TeacherProfileFragment extends Fragment {

    static TeacherProfileFragment fragment = null;
    TextView mName;
    TextView mInitial;
    TextView mSchool;
    TextView mSex;
    FloatingActionButton mEditButton;
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
        mSchool = view.findViewById(R.id.tv_school);
        mSex = view.findViewById(R.id.tv_sex);
        mEditButton = view.findViewById(R.id.fb_profile_edit);

        // Fetch students previous data and place them on ui for editing profile
        teacherProfileViewModel.getTeacherProfileDetailsResponseMutableLiveData().observe(getActivity(), this::changeUiAccordingToStudentsProfileData);

        mEditButton.setOnClickListener(v -> {
            Intent intent = new Intent(getActivity(), PageActivity.class);
            intent.putExtra(getResources().getString((R.string.selected_fragment)),
                    getResources().getString(R.string.teacher_profile_edit));
            getActivity().startActivity(intent);
        });

    }

    private void changeUiAccordingToStudentsProfileData(TeacherProfileDetailsResponse teacherProfileDetailsResponse) {
        mName.setText(teacherProfileDetailsResponse.getTeacher().getUsers().getName());
        mInitial.setText(teacherProfileDetailsResponse.getTeacher().getInitial());
        mSchool.setText(teacherProfileDetailsResponse.getTeacher().getUsers().getSchool());
        mSex.setText(teacherProfileDetailsResponse.getTeacher().getUsers().getSex());
    }

}