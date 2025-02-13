/*
 * TeacherDashboardFragment Created by Mahfuj Ahmed Jim
 * Last modified  2/9/23, 1:16 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.dashboard;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

import life.nsu.aether.R;
import life.nsu.aether.utils.adapters.TeacherCoursesAdapter;

public class TeacherDashboardFragment extends Fragment {

    static TeacherDashboardFragment fragment = null;
    private BarChart mMonthlyEarningBarChart;
    private List<BarEntry> monthlyEarningData = new ArrayList<BarEntry>();
    private BarDataSet monthlyEarningDataset;
    private BarData monthlyEarningChartData;
    private PieChart mRemainingTaskPieChart;
    private List<PieEntry> remainingTaskData = new ArrayList<PieEntry>();
    private PieDataSet remainingTaskDataset;
    private PieData remainingTaskChartData;
    private RecyclerView mCourseRecyclerView;
    private TeacherCoursesAdapter teacherCoursesAdapter;

    public static TeacherDashboardFragment newInstance() {
        if (fragment == null) {
            synchronized (TeacherDashboardFragment.class) {
                if (fragment == null) {
                    return new TeacherDashboardFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_teacher_dashboard, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        initializeVariables(view);
        getMonthlyEarningBarChart();
        setUpPromotionalRecyclerView();
        getRemainingTaskPieChart();
    }

    private void initializeVariables(@NotNull View view) {
        mMonthlyEarningBarChart = view.findViewById(R.id.bc_monthly_earning);
        mRemainingTaskPieChart = view.findViewById(R.id.pc_remainingTask);

        mCourseRecyclerView = view.findViewById(R.id.rv_courses);
    }

    void getMonthlyEarningBarChart(){
        monthlyEarningData.add(new BarEntry(0, 140));
        monthlyEarningData.add(new BarEntry(1, 260));
        monthlyEarningData.add(new BarEntry(2, 147));
        monthlyEarningData.add(new BarEntry(3, 341));
        monthlyEarningData.add(new BarEntry(4, 480));
        monthlyEarningData.add(new BarEntry(5, 248));
        monthlyEarningData.add(new BarEntry(6, 350));
        monthlyEarningData.add(new BarEntry(7, 480));
        monthlyEarningData.add(new BarEntry(8, 420));
        monthlyEarningData.add(new BarEntry(9, 190));
        monthlyEarningData.add(new BarEntry(10, 100));
        monthlyEarningData.add(new BarEntry(11, 110));

        monthlyEarningDataset = new BarDataSet(monthlyEarningData, "Monthly Earning");
        monthlyEarningDataset.setColor(getContext().getColor(R.color.teacher_main_color));

        monthlyEarningChartData = new BarData();
        monthlyEarningChartData.addDataSet(monthlyEarningDataset);

        mMonthlyEarningBarChart.setData(monthlyEarningChartData);
        mMonthlyEarningBarChart.invalidate();
    }

    private void setUpPromotionalRecyclerView() {

        // set horizontal scroll
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
        mCourseRecyclerView.setLayoutManager(layoutManager);

        // set recyclerViews
        teacherCoursesAdapter = new TeacherCoursesAdapter(getContext());
        mCourseRecyclerView.setHasFixedSize(true);
        mCourseRecyclerView.setAdapter(teacherCoursesAdapter);
    }

    void getRemainingTaskPieChart(){
        remainingTaskData.add(new PieEntry(60, ""));
        remainingTaskData.add(new PieEntry(13, ""));
        remainingTaskData.add(new PieEntry(13, ""));
        remainingTaskData.add(new PieEntry(13, ""));

        remainingTaskDataset = new PieDataSet(remainingTaskData, "Remaining Task");
        remainingTaskDataset.setColors(getContext().getColor(R.color.deep_purple_700),
                getContext().getColor(R.color.teacher_main_color),
                getContext().getColor(R.color.deep_purple_500),
                getContext().getColor(R.color.deep_purple_300));

        remainingTaskChartData = new PieData();
        remainingTaskChartData.addDataSet(remainingTaskDataset);
        remainingTaskChartData.setValueTextColor(getContext().getColor(R.color.white));
        remainingTaskChartData.setValueTextSize(10);

        mRemainingTaskPieChart.setData(remainingTaskChartData);
        mRemainingTaskPieChart.invalidate();
    }
}