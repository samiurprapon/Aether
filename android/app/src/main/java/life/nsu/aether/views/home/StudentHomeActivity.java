/*
 * StudentHomeActivity Created by Samiur Prapon
 * Last modified  7/30/21, 6:23 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.home;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.gauravk.bubblenavigation.BubbleNavigationLinearView;

import life.nsu.aether.R;
import life.nsu.aether.utils.adapters.ViewPagerAdapter;
import life.nsu.aether.views.fragments.StudentClassroomFragment;
import life.nsu.aether.views.fragments.StudentCourseFragment;
import life.nsu.aether.views.fragments.StudentExamFragment;
import life.nsu.aether.views.fragments.StudentHomeFragment;
import life.nsu.aether.views.fragments.StudentMoreFragment;

public class StudentHomeActivity extends AppCompatActivity {

    BubbleNavigationLinearView navigationView;
    ViewPager viewPager;
    ViewPagerAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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