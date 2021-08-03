/*
 * StudentHomeFragment Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.fragments;

import android.annotation.SuppressLint;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;

import life.nsu.aether.R;

public class StudentHomeFragment extends Fragment {

    private Spinner dateTypesSpinner;
    private LineChart lineChart;
    @SuppressLint("StaticFieldLeak")
    static StudentHomeFragment fragment = null;


    public StudentHomeFragment() {
        // Required empty public constructor
    }

    public static StudentHomeFragment newInstance() {
        if (fragment == null) {
            synchronized (StudentHomeFragment.class) {
                if (fragment == null) {
                    return new StudentHomeFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_student_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @org.jetbrains.annotations.NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        // When the view is created we can start working with the fragment
        initializeVariables(view);
        initializeLogic();
    }

    private void initializeLogic() {
        loadSpinnerData();
        loadChartGraphData();
    }

    private void loadChartGraphData() {
// apply styling
        // lineChart.setValueTypeface(mTf);
        lineChart.getDescription().setEnabled(false);
        lineChart.setDrawGridBackground(false);

        Typeface mTf = Typeface.MONOSPACE;

        XAxis xAxis = lineChart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setTypeface(mTf);
        xAxis.setDrawGridLines(false);
        xAxis.setDrawAxisLine(true);

        YAxis leftAxis = lineChart.getAxisLeft();
        leftAxis.setTypeface(mTf);
        leftAxis.setLabelCount(5, false);
        leftAxis.setAxisMinimum(0f); // this replaces setStartAtZero(true)

        YAxis rightAxis = lineChart.getAxisRight();
        rightAxis.setTypeface(mTf);
        rightAxis.setLabelCount(5, false);
        rightAxis.setDrawGridLines(false);
        rightAxis.setAxisMinimum(0f); // this replaces setStartAtZero(true)

        // set data
        lineChart.setData(generateDataLine(5));

        Drawable background = lineChart.getBackground();
        background.setAlpha(20);

        // do not forget to refresh the chart
        // lineChart.invalidate();
        lineChart.animateX(750);
    }

    private LineData generateDataLine(int cnt) {

        ArrayList<Entry> values1 = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            values1.add(new Entry(i, (int) (Math.random() * 65) + 40));
        }

        LineDataSet dataSet = new LineDataSet(values1, "New DataSet " + cnt + ", (1)");
        dataSet.setLineWidth(2.5f);
        dataSet.setCircleRadius(4.5f);
        dataSet.setHighLightColor(Color.BLACK);

        dataSet.setMode(LineDataSet.Mode.CUBIC_BEZIER);
        dataSet.setColor(Color.rgb(0, 0, 0));
        dataSet.setCircleColor(Color.rgb(243, 113, 114));
        dataSet.setCircleHoleColor(Color.rgb(243, 113, 114));
        dataSet.setDrawValues(false);

        ArrayList<ILineDataSet> sets = new ArrayList<>();
        sets.add(dataSet);

        return new LineData(sets);
    }

    private void loadSpinnerData() {
        ArrayList<String> dateTypesArrayList = new ArrayList<>();
        dateTypesArrayList.add("Daily");
        dateTypesArrayList.add("Weekly");
        dateTypesArrayList.add("Monthly");
        dateTypesArrayList.add("Semester");

        ArrayAdapter spinnerAdapter = new ArrayAdapter(getActivity(), R.layout.custom_spinner_view,
                dateTypesArrayList);
        spinnerAdapter.setDropDownViewResource(R.layout.custom_spinner_item_view);
        dateTypesSpinner.setAdapter(spinnerAdapter);
        dateTypesSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (position) {
                    case 0:
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    private void initializeVariables(@NotNull View view) {
        dateTypesSpinner = view.findViewById(R.id.spinner_1);
        lineChart = view.findViewById(R.id.chart);
    }
}