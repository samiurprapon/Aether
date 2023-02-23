/*
 * TeacherModifyCourseFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/23/23, 7:54 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelStoreOwner;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;

import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

import life.nsu.aether.R;
import life.nsu.aether.viewModels.teacher.TeacherCourseViewModel;

public class TeacherModifyCourseFragment extends Fragment {

    TextInputEditText mCourseNameEditText;
    TextInputEditText mCourseCodeEditText;
    TextInputEditText mSectionEditText;
    TextInputEditText mSemesterEditText;
    Button mAddCourseButton;
    static TeacherModifyCourseFragment fragment = null;
    private TeacherCourseViewModel viewModel;

    public static TeacherModifyCourseFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherModifyCourseFragment.class) {
                if (fragment == null) {
                    return new TeacherModifyCourseFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_modify_course, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mCourseNameEditText = view.findViewById(R.id.et_course_name);
        mCourseCodeEditText = view.findViewById(R.id.et_course_code);
        mSectionEditText = view.findViewById(R.id.et_course_section);
        mSemesterEditText = view.findViewById(R.id.et_course_semester);
        mAddCourseButton = view.findViewById(R.id.mb_add_course);

        viewModel = new ViewModelProvider(getActivity()).get(TeacherCourseViewModel.class);

        mAddCourseButton.setOnClickListener(v -> {
            mAddCourseButton.setEnabled(false);
            hideKeyboard(getContext(), v);
            addCourse();
            mAddCourseButton.setEnabled(true);
        });

    }

    private void addCourse() {
        String name = Objects.requireNonNull(mCourseNameEditText.getText()).toString().trim();
        String section = Objects.requireNonNull(mSectionEditText.getText()).toString().trim();
        String code = Objects.requireNonNull(mCourseCodeEditText.getText()).toString().trim();
        String semester = Objects.requireNonNull(mSemesterEditText.getText()).toString().trim();

        viewModel.addTeacherCourseResponseMutableLiveData(name, Integer.parseInt(section), code, semester);

        getActivity().onBackPressed();
    }

    public void hideKeyboard(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
}