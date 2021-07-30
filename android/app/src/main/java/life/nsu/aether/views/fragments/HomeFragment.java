/*
 * HomeFragment Created by Sharif Rafid
 * Last modified  17/7/21, 11:11 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.fragments;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;

import life.nsu.aether.R;

public class HomeFragment extends Fragment {

    private Spinner dateTypesSpinner;
    private LineChart lineChart;

    public HomeFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @org.jetbrains.annotations.NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        // When the view is created we can start working with the fragment
        initiliazeVariables(view);
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
        lineChart.setData((LineData) generateDataLine(5));

        // do not forget to refresh the chart
        // lineChart.invalidate();
        lineChart.animateX(750);
    }

    private LineData generateDataLine(int cnt) {

        ArrayList<Entry> values1 = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            values1.add(new Entry(i, (int) (Math.random() * 65) + 40));
        }

        LineDataSet d1 = new LineDataSet(values1, "New DataSet " + cnt + ", (1)");
        d1.setLineWidth(2.5f);
        d1.setCircleRadius(4.5f);
        d1.setHighLightColor(Color.BLACK);
        d1.setMode(LineDataSet.Mode.CUBIC_BEZIER);
        d1.setCircleColor(Color.rgb(245,245,247));
        d1.setCircleHoleColor(Color.rgb(245,245,247));
        d1.setDrawValues(false);

        ArrayList<ILineDataSet> sets = new ArrayList<>();
        sets.add(d1);

        return new LineData(sets);
    }

    private void loadSpinnerData() {
        ArrayList<String> dateTypesArrayList = new ArrayList<String>();
        dateTypesArrayList.add("Daily");
        dateTypesArrayList.add("Weekly");
        dateTypesArrayList.add("Monthly");
        dateTypesArrayList.add("Yearly");
        ArrayAdapter spinnerAdapter = new ArrayAdapter(getActivity(), R.layout.custom_spinner_view,
                dateTypesArrayList);
        spinnerAdapter.setDropDownViewResource(R.layout.custom_spinner_item_view);
        dateTypesSpinner.setAdapter(spinnerAdapter);
        dateTypesSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (position){
                    case 0 :
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    private void initiliazeVariables(@NotNull View view) {
        dateTypesSpinner = view.findViewById(R.id.spinner_1);
        lineChart = view.findViewById(R.id.chart);
    }
}