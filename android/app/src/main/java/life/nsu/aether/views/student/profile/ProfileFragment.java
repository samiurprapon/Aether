/*
 * ProfileFragment Created by Samiur Prapon
 * Last modified  2/5/23, 8:34 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.student.profile;

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
import life.nsu.aether.viewModels.student.StudentProfileViewModel;
import life.nsu.aether.views.student.examination.StudentExamFragment;

public class ProfileFragment extends Fragment {

    static ProfileFragment fragment = null;
    TextView mName;
    TextView mStudentId;
    TextView mEmail;
    TextView mSchool;
    TextView mGender;
    TextView mDateOfBirth;
    StudentProfileViewModel studentProfileViewModel;

    public static ProfileFragment newInstance() {
        if (fragment == null) {
            synchronized (ProfileFragment.class) {
                if (fragment == null) {
                    return new ProfileFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

        studentProfileViewModel = new ViewModelProvider(this).get(StudentProfileViewModel.class);
        mName = view.findViewById(R.id.tv_name);
        mStudentId = view.findViewById(R.id.tv_student_id);
        mEmail = view.findViewById(R.id.tv_email);
        mSchool = view.findViewById(R.id.tv_school);
        mGender = view.findViewById(R.id.tv_gender);
        mDateOfBirth = view.findViewById(R.id.tv_date_of_birth);

        // Fetch students previous data and place them on ui for editing profile
        studentProfileViewModel.getStudentProfileDetailsResponseMutableLiveData().observe(getActivity(), this::changeUiAccordingToStudentsProfileData);

    }

    private void changeUiAccordingToStudentsProfileData(StudentProfileDetailsResponse studentProfileDetailsResponse) {
        mName.setText(studentProfileDetailsResponse.getStudent().getUser().getName());
        mStudentId.setText(studentProfileDetailsResponse.getStudent().getDetails().getStudentID());
        mEmail.setText(studentProfileDetailsResponse.getStudent().getUser().getEmail());
        mGender.setText(studentProfileDetailsResponse.getStudent().getUser().getSex());
    }

}
