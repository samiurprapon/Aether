/*
 * TeacherCourseFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/10/23, 1:56 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupMenu;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.google.android.material.button.MaterialButton;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;
import life.nsu.aether.utils.adapters.TeacherTaskAdapter;
import life.nsu.aether.viewModels.teacher.TeacherCourseViewModel;
import life.nsu.aether.views.teacher.dashboard.TeacherStudentsAdapter;

public class TeacherCourseFragment extends Fragment {

    static TeacherCourseFragment fragment = null;
    private MaterialButton mMoreButton;
    private TextView mCourseNameTextView;
    private RecyclerView mStudentsRecyclerView;
    private TeacherStudentsAdapter teacherStudentsAdapter;
    private PieChart mStudentStatusPieChart;
    private List<PieEntry> studentStatusData = new ArrayList<PieEntry>();
    private PieDataSet studentStatusDataset;
    private PieData studentStatusChartData;
    private RecyclerView mTasksRecyclerView;
    private TeacherTaskAdapter teacherTaskAdapter;
    private TeacherCourseViewModel viewModel;
    private Course course;

    public static TeacherCourseFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherCourseFragment.class) {
                if (fragment == null) {
                    return new TeacherCourseFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_course, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        initializeVariables(view);
        setUpStudentsRecyclerView();
        getStudentStatusPieChart();
        setUpTaskRecyclerView();
    }

    private void initializeVariables(@NotNull View view) {
        mMoreButton = view.findViewById(R.id.mb_more);
        mCourseNameTextView = view.findViewById(R.id.tv_course_name);
        mStudentsRecyclerView = view.findViewById(R.id.rv_all_student);
        mStudentStatusPieChart = view.findViewById(R.id.pc_studentStatus);
        mTasksRecyclerView = view.findViewById(R.id.rv_task);

        viewModel = new ViewModelProvider(getActivity()).get(TeacherCourseViewModel.class);

        course = (Course) getArguments().getSerializable(getResources().getString(R.string.intent_course_name));

        // set values according to that particular course
        setUpValues();

        /*mDeleteCourseButton.setOnClickListener(v -> {
            try{
                viewModel.deleteTeacherCourseResponseMutableLiveData(course.getId());
                getActivity().onBackPressed();
            }catch (Exception e){
                Toast.makeText(getContext(), e.getMessage(), Toast.LENGTH_LONG).show();
            }
        });*/

        mMoreButton.setOnClickListener(v -> {
            createMenu(v);
        });

    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
        inflater.inflate(R.menu.teacher_course_menu, menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.mEdit:
                editCourse();
                break;

            case R.id.mArchive:

                break;
        }

        return false;
    }

    private void setUpValues(){
        mCourseNameTextView.setText(course.getName());
    }

    private void createMenu(View v) {
        PopupMenu pm = new PopupMenu(getContext(), v);
        pm.getMenuInflater().inflate(R.menu.teacher_course_menu, pm.getMenu());
        pm.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.mEdit:
                        editCourse();
                        break;

                    case R.id.mArchive:
                        archiveCourse();
                        break;
                }

                return false;
            }
        }); pm.show();
    }

    private void setUpStudentsRecyclerView() {
        // set horizontal scroll
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
        mStudentsRecyclerView.setLayoutManager(layoutManager);

        // set recyclerViews
        teacherStudentsAdapter = new TeacherStudentsAdapter(getContext());
        mStudentsRecyclerView.setHasFixedSize(true);
        mStudentsRecyclerView.setAdapter(teacherStudentsAdapter);
    }

    private void getStudentStatusPieChart(){
        studentStatusData.add(new PieEntry(60, ""));
        studentStatusData.add(new PieEntry(13, ""));
        studentStatusData.add(new PieEntry(13, ""));
        studentStatusData.add(new PieEntry(13, ""));

        studentStatusDataset = new PieDataSet(studentStatusData, "Remaining Task");
        studentStatusDataset.setColors(getContext().getColor(R.color.deep_purple_700),
                getContext().getColor(R.color.teacher_main_color),
                getContext().getColor(R.color.deep_purple_500),
                getContext().getColor(R.color.deep_purple_300));

        studentStatusChartData = new PieData();
        studentStatusChartData.addDataSet(studentStatusDataset);
        studentStatusChartData.setValueTextColor(getContext().getColor(R.color.white));
        studentStatusChartData.setValueTextSize(10);

        mStudentStatusPieChart.setData(studentStatusChartData);
        mStudentStatusPieChart.invalidate();
    }

    private void editCourse(){
        TeacherModifyCourseFragment teacherModifyCourseFragment
                = new TeacherModifyCourseFragment();

        Bundle args = new Bundle();
        args.putBoolean(getResources().getString(R.string.teacher_modify_course), true);
        args.putSerializable(getResources().getString(R.string.intent_course_name), course);
        teacherModifyCourseFragment.setArguments(args);

        getActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_layout_id, teacherModifyCourseFragment)
                .commit();
    }

    private void archiveCourse(){
        viewModel.archiveTeacherCourseResponseMutableLiveData(course.getId());
        getActivity().onBackPressed();
    }

    private void setUpTaskRecyclerView() {
        // set horizontal scroll
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
        mTasksRecyclerView.setLayoutManager(layoutManager);

        // set recyclerViews
        teacherTaskAdapter = new TeacherTaskAdapter(getContext());
        mTasksRecyclerView.setHasFixedSize(true);
        mTasksRecyclerView.setAdapter(teacherTaskAdapter);
    }
}