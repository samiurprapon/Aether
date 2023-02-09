/*
 * TeacherHomeActivity Created by Mahfuj Ahmed Jim
 * Last modified  2/9/23, 1:10 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import life.nsu.aether.R;
import life.nsu.aether.views.teacher.courses.TeacherCourseFragment;
import life.nsu.aether.views.teacher.dashboard.TeacherDashboardFragment;

public class TeacherHomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_home);

        TeacherDashboardFragment teacherDashboardFragment = new TeacherDashboardFragment();
        getSupportFragmentManager().beginTransaction().replace(R.id.fragment_layout_id, teacherDashboardFragment).commit();

    }
}