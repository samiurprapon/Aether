/*
 * TeacherHomeActivity Created by Mahfuj Ahmed Jim
 * Last modified  2/9/23, 1:10 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.gauravk.bubblenavigation.BubbleNavigationLinearView;

import life.nsu.aether.R;
import life.nsu.aether.utils.adapters.ViewPagerAdapter;
import life.nsu.aether.views.teacher.classroom.TeacherClassroomFragment;
import life.nsu.aether.views.teacher.courses.TeacherCourseFragment;
import life.nsu.aether.views.teacher.dashboard.TeacherDashboardFragment;
import life.nsu.aether.views.teacher.exam.TeacherExamFragment;
import life.nsu.aether.views.teacher.profile.TeacherProfileFragment;

public class TeacherHomeActivity extends AppCompatActivity {

    BubbleNavigationLinearView navigationView;
    ViewPager viewPager;
    ViewPagerAdapter adapter;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_home);

        navigationView = findViewById(R.id.nav_container);
//        navigationView.setTypeface(ResourcesCompat.getFont(this, R.font.roboto_medium));

        viewPager = findViewById(R.id.view_pager);
        adapter = new ViewPagerAdapter(getSupportFragmentManager(), 1);

        adapter.addFragment(TeacherDashboardFragment.newInstance());
        adapter.addFragment(TeacherCourseFragment.newInstance());
        adapter.addFragment(TeacherClassroomFragment.newInstance());
        adapter.addFragment(TeacherExamFragment.newInstance());
        adapter.addFragment(TeacherProfileFragment.newInstance());

        viewPager.setAdapter(adapter);

        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int i, float v, int i1) {
            }

            @Override
            public void onPageSelected(int i) {
                navigationView.setCurrentActiveItem(i);
            }

            @Override
            public void onPageScrollStateChanged(int i) {

            }
        });

        navigationView.setNavigationChangeListener((view, position) -> {
            // automatic fragment changing
            viewPager.setCurrentItem(position, true);
        });

    }
}