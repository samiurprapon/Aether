/*
 * TeacherAllCoursesFragment Created by Mshfuj Ahmed Jim
 * Last modified  2/22/23, 1:00 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import java.util.ArrayList;
import java.util.List;

import life.nsu.aether.R;
import life.nsu.aether.views.teacher.dashboard.TeacherStudentsAdapter;

public class TeacherAllCoursesFragment extends Fragment {

    static TeacherAllCoursesFragment fragment = null;

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
    }
}