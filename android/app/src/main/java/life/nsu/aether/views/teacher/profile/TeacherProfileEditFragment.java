/*
 * TeacherProfileEditFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 10:36 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.profile;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.viewModels.teacher.TeacherProfileViewModel;
import life.nsu.aether.views.authentication.LoginActivity;
import life.nsu.aether.views.authentication.RegistrationActivity;

public class TeacherProfileEditFragment extends Fragment {

    TextInputEditText mNameEditText;
    TextInputEditText mInitialEditText;
    RadioButton mMaleRadioButton;
    RadioButton mFemaleRadioButton;
    MaterialButton mUpdateButton;
    TeacherProfileViewModel viewModel;
    CustomProgressBar progressBar;

    static TeacherProfileEditFragment fragment = null;

    public static TeacherProfileEditFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherProfileEditFragment.class) {
                if (fragment == null) {
                    return new TeacherProfileEditFragment();
                }
            }
        }
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_profile_edit, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mNameEditText = view.findViewById(R.id.et_name);
        mInitialEditText = view.findViewById(R.id.et_initial);
        mMaleRadioButton = view.findViewById(R.id.rb_male);
        mFemaleRadioButton = view.findViewById(R.id.rb_female);
        mUpdateButton = view.findViewById(R.id.mb_update);

        progressBar = new CustomProgressBar(getActivity());

        mUpdateButton.setOnClickListener(v -> {

            if(mNameEditText.getText().toString().isEmpty() || mInitialEditText.getText().toString().isEmpty() || (!mMaleRadioButton.isChecked() && !mFemaleRadioButton.isChecked())){
                // set warning
                Toast.makeText(getActivity(), "Fill All the Information",
                        Toast.LENGTH_LONG).show();
            }else{
                updateTeacherPorfile(v);
            }

        });

    }

    private void updateTeacherPorfile(View v) {
        mUpdateButton.setEnabled(false); // prevent double clicking
        hideKeyboard(getActivity(), v);
        progressBar.show("");

        String initial = Objects.requireNonNull(mInitialEditText.getText()).toString();
        String name = Objects.requireNonNull(mNameEditText.getText()).toString();
        String sex = Objects.requireNonNull(
                mMaleRadioButton.isChecked()? "Male" :
                        mFemaleRadioButton.isChecked()? "Female" : "");

        viewModel.postMutableTeacherProfileRequest(initial, name, sex)
                .observe(getActivity(), teacherProfileDetailsResponse -> {

                    getActivity().onBackPressed(); // back to previous page

                });

        mUpdateButton.setEnabled(true);
    }

    public void hideKeyboard(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

}