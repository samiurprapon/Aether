/*
 * StudentCourseFragment Created by Samiur Prapon
 * Last modified  8/15/21, 12:08 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.student.course;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelStoreOwner;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.List;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;
import life.nsu.aether.utils.adapters.CourseRecyclerAdapter;
import life.nsu.aether.utils.dialog.CourseEnrollDialog;
import life.nsu.aether.viewModels.student.StudentCourseViewModel;
import life.nsu.aether.views.student.dashboard.StudentHomeFragment;


public class StudentCourseFragment extends Fragment {

    MaterialButton mOngoing;
    MaterialButton mArchived;
    MaterialButton mStudy;
    RecyclerView recyclerView;

    List<Course> courseList;

    CourseRecyclerAdapter adapter;
    private CourseEnrollDialog courseEnrollDialog;
    private StudentCourseViewModel viewModel;
    static StudentCourseFragment fragment = null;

    public static StudentCourseFragment newInstance() {
        if (fragment == null) {
            synchronized (StudentHomeFragment.class) {
                if (fragment == null) {
                    return new StudentCourseFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_student_course, container, false);
    }

    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        // adapter initialized
        adapter = new CourseRecyclerAdapter(getContext());
        courseEnrollDialog = new CourseEnrollDialog(getActivity());

        mOngoing = view.findViewById(R.id.mb_ongoing_course);
        mArchived = view.findViewById(R.id.mb_archive_course);
        mStudy = view.findViewById(R.id.mb_start_study);
        recyclerView = view.findViewById(R.id.rv_course);

        // initialize viewModel
        viewModel = new ViewModelProvider(getActivity()).get(StudentCourseViewModel.class);

        // initialize courses
        courseList = new ArrayList<>();

        mOngoing.setEnabled(false);

        initializeRecyclerView();

        mStudy.setOnClickListener(v -> {
            // Go to immediate next course material
            // immediate next course will be selected with respect to time
            courseEnrollDialog.show();
        });

        mArchived.setOnClickListener(v -> {
            mArchived.setEnabled(false);
            mOngoing.setEnabled(true);

            mOngoing.setTextColor(Color.parseColor("#B3B3B3"));
            mArchived.setTextColor(Color.parseColor("#000000"));
        });

        mOngoing.setOnClickListener(v -> {
            mOngoing.setEnabled(false);
            mArchived.setEnabled(true);

            mArchived.setTextColor(Color.parseColor("#B3B3B3"));
            mOngoing.setTextColor(Color.parseColor("#000000"));
        });

        courseEnrollDialog.mEnrollButton.setOnClickListener(v -> {
            viewModel.postStudentEnrollCourseResponseMutableLiveData(
                            courseEnrollDialog.mEnrollEditText.getText().toString().trim())
                    .observe(getActivity(), studentCourseResponse -> {
                        Log.d("Verify", studentCourseResponse.getMessage());
                        courseEnrollDialog.dismiss();
                    });
        });
    }

    private void initializeRecyclerView() {
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setNestedScrollingEnabled(true);

        getCourseList();

        adapter.setCourseList(courseList);
        recyclerView.setAdapter(adapter);
    }

    private void getCourseList() {
        courseList.clear();

    }
}