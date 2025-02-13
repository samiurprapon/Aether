/*
 * StudentHomeActivity Created by Samiur Prapon
 * Last modified  8/5/21, 9:01 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.student;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.gauravk.bubblenavigation.BubbleNavigationLinearView;

import life.nsu.aether.R;
import life.nsu.aether.utils.adapters.ViewPagerAdapter;
import life.nsu.aether.views.student.classroom.StudentClassroomFragment;
import life.nsu.aether.views.student.course.StudentCourseFragment;
import life.nsu.aether.views.student.examination.StudentExamFragment;
import life.nsu.aether.views.student.dashboard.StudentHomeFragment;
import life.nsu.aether.views.student.options.StudentMoreFragment;

public class StudentHomeActivity extends AppCompatActivity {

    BubbleNavigationLinearView navigationView;
    ViewPager viewPager;
    ViewPagerAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);

        setContentView(R.layout.activity_student_home);

        navigationView = findViewById(R.id.nav_container);
//        navigationView.setTypeface(ResourcesCompat.getFont(this, R.font.roboto_medium));

        viewPager = findViewById(R.id.view_pager);
        adapter = new ViewPagerAdapter(getSupportFragmentManager(), 1);

        adapter.addFragment(StudentHomeFragment.newInstance());
        adapter.addFragment(StudentCourseFragment.newInstance());
        adapter.addFragment(StudentClassroomFragment.newInstance());
        adapter.addFragment(StudentExamFragment.newInstance());
        adapter.addFragment(StudentMoreFragment.newInstance());

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