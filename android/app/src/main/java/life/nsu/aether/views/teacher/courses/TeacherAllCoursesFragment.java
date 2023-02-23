/*
 * TeacherAllCoursesFragment Created by Mshfuj Ahmed Jim
 * Last modified  2/22/23, 1:00 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;
import life.nsu.aether.utils.adapters.TeacherOnGoingCourseAdapter;
import life.nsu.aether.utils.networking.responses.TeacherCoursesResponse;
import life.nsu.aether.viewModels.teacher.TeacherCourseViewModel;
import life.nsu.aether.views.PageActivity;

public class TeacherAllCoursesFragment extends Fragment {

    MaterialButton mOngoing;
    MaterialButton mArchived;
    RecyclerView courseRecyclerView;
    FloatingActionButton mAddButton;
    List<Course> courseList;
    TeacherOnGoingCourseAdapter courseRecyclerAdapter;

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

        mOngoing = view.findViewById(R.id.mb_ongoing_course);
        mArchived = view.findViewById(R.id.mb_archive_course);
        courseRecyclerView = view.findViewById(R.id.rv_course);
        mAddButton = view.findViewById(R.id.fb_profile_add);

        // initialize courses
        courseList = new ArrayList<>();
        courseRecyclerAdapter = new TeacherOnGoingCourseAdapter(getContext());

        mOngoing.setEnabled(false);

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

        mAddButton.setOnClickListener(v -> {
            Intent intent = new Intent(getContext(), PageActivity.class);
            intent.putExtra(getContext().getResources()
                            .getString((R.string.selected_fragment)),
                    getContext().getResources().getString(R.string.teacher_modify_course));
            intent.putExtra(getContext().getResources()
                    .getString(R.string.teacher_modify_course), false);
            getContext().startActivity(intent);
        });

    }

    private void changeUiAccordingToTeacherProfileData(TeacherCoursesResponse teacherCoursesResponse){
        courseList.clear();
        courseList = teacherCoursesResponse.getCourses();
        initializeRecyclerView();
    }

    private void initializeRecyclerView() {
        courseRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        courseRecyclerView.setItemAnimator(new DefaultItemAnimator());
        courseRecyclerView.setNestedScrollingEnabled(true);

        courseRecyclerAdapter.setCourseList(courseList);
        courseRecyclerView.setAdapter(courseRecyclerAdapter);
    }

    @Override
    public void onResume() {
        super.onResume();
        // Fetch all courses data
        viewModel.getTeacherCourseResponseMutableLiveData()
                .observe(getActivity(), this::changeUiAccordingToTeacherProfileData);
    }
}