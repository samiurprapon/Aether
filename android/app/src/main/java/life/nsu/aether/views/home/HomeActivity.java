/*
 * HomeActivity Created by Sharif Rafid
 * Last modified  17/7/21, 10:46 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.home;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;
import android.view.View;

import com.gauravk.bubblenavigation.BubbleNavigationLinearView;
import com.gauravk.bubblenavigation.BubbleToggleView;
import com.gauravk.bubblenavigation.listener.BubbleNavigationChangeListener;

import java.util.ArrayList;

import life.nsu.aether.R;
import life.nsu.aether.utils.adapters.HomePageFragmentSliderAdapter;
import life.nsu.aether.views.fragments.ClassesFragment;
import life.nsu.aether.views.fragments.CoursesFragment;
import life.nsu.aether.views.fragments.ExamFragment;
import life.nsu.aether.views.fragments.HomeFragment;
import life.nsu.aether.views.fragments.MoreFragment;

import static androidx.fragment.app.FragmentStatePagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT;

public class HomeActivity extends AppCompatActivity {

    private ViewPager fragmentContainerViewPagerHome;
    private BubbleNavigationLinearView bubbleNavigationLinearViewHome;
    private BubbleToggleView bubbleToggleViewHome, bubbleToggleViewBooks, bubbleToggleViewClass, bubbleToggleViewExam, bubbleToggleViewMore;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        initializeVariables();
        initiateLogics();
    }

    private void initiateLogics() {
        loadViewPagerAndFragments();
    }

    private void loadViewPagerAndFragments() {
        //Adding the fragments to array list
        ArrayList<Fragment> fragmentArrayList = new ArrayList<>();
        fragmentArrayList.add(new HomeFragment());
        fragmentArrayList.add(new CoursesFragment());
        fragmentArrayList.add(new ClassesFragment());
        fragmentArrayList.add(new ExamFragment());
        fragmentArrayList.add(new MoreFragment());

        //Creating adapter for viewpager for showing the fragments
        HomePageFragmentSliderAdapter homePageFragmentSliderAdapter = new HomePageFragmentSliderAdapter(fragmentArrayList, getSupportFragmentManager(), BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);

        // Setting the adapter
        fragmentContainerViewPagerHome.setAdapter(homePageFragmentSliderAdapter);

        // This listener is mainly for changing the state of the bottom navigation view item states
        // When the user swipes the view and navigates throughout the fragment
        fragmentContainerViewPagerHome.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                // Changing the state of the navigation view
                bubbleNavigationLinearViewHome.setCurrentActiveItem(position);
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

        //This is also for the same reason changing the state of the viewpager when the nav item changes
        bubbleNavigationLinearViewHome.setNavigationChangeListener(new BubbleNavigationChangeListener() {
            @Override
            public void onNavigationChanged(View view, int position) {
                //Setting the fragment to the view pager
                fragmentContainerViewPagerHome.setCurrentItem(position);
            }
        });
    }

    private void initializeVariables() {
        fragmentContainerViewPagerHome = findViewById(R.id.fragment_container_view_pager);
        bubbleNavigationLinearViewHome = findViewById(R.id.bottom_navigation_view_container);
        bubbleToggleViewHome = findViewById(R.id.bottom_navigation_view_item_home);
        bubbleToggleViewBooks = findViewById(R.id.bottom_navigation_view_item_books);
        bubbleToggleViewClass = findViewById(R.id.bottom_navigation_view_item_class);
        bubbleToggleViewExam = findViewById(R.id.bottom_navigation_view_item_exam);
        bubbleToggleViewMore = findViewById(R.id.bottom_navigation_view_item_more);
    }
}