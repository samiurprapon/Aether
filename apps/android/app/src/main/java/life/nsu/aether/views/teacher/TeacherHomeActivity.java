/*
 * TeacherHomeActivity Created by Mahfuj Ahmed Jim
 * Last modified  2/9/23, 1:10 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.navigation.NavigationView;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.viewModels.student.StudentMoreViewModel;
import life.nsu.aether.viewModels.teacher.TeacherMenuViewModel;
import life.nsu.aether.views.teacher.courses.TeacherAllCoursesFragment;
import life.nsu.aether.views.teacher.dashboard.TeacherDashboardFragment;
import life.nsu.aether.views.teacher.profile.TeacherProfileFragment;

public class TeacherHomeActivity extends AppCompatActivity {

    DrawerLayout drawerLayout;
    NavigationView navigationView;
    ActionBarDrawerToggle toggle;
    ImageButton mMenuButton;
    CustomProgressBar progressBar;
    TeacherMenuViewModel viewModel;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_home);

        teacherHomePage();

        // view model initialize
        viewModel = new ViewModelProvider(this).get(TeacherMenuViewModel.class);

        // initialize progress showing dialog
        progressBar = new CustomProgressBar(this);

        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_View);
        mMenuButton = findViewById(R.id.ib_menu);

        toggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.open, R.string.close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                switch (item.getItemId()) {
                    case R.id.mHome:
                        teacherHomePage();
                        drawerLayout.closeDrawers();
                        break;

                    case R.id.mCourse:
                        teacherCoursePage();
                        drawerLayout.closeDrawers();
                        break;

                    case R.id.mProfile:
                        teacherMorePage();
                        drawerLayout.closeDrawers();
                        break;

                    case R.id.mLogout:
                        teacherLogOut();
                        drawerLayout.closeDrawers();
                        break;

                }

                return false;
            }
        });

        mMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Code Here
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });

    }

    private void teacherLogOut() {
        progressBar.show("Logging out ...");

        new Handler(Looper.myLooper()).postDelayed(() -> viewModel.getDeAuthResponse().observe(this, deAuthResponse -> {
            progressBar.hide();

            viewModel.switchActivity(deAuthResponse);
        }), 500);
    }

    private void teacherHomePage() {
        TeacherDashboardFragment teacherDashboardFragment
                = new TeacherDashboardFragment();

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_layout_id, teacherDashboardFragment)
                .commit();
    }

    private void teacherCoursePage() {
        TeacherAllCoursesFragment teacherAllCoursesFragment
                = new TeacherAllCoursesFragment();

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_layout_id, teacherAllCoursesFragment)
                .commit();
    }

    private void teacherMorePage() {
        TeacherProfileFragment teacherProfileFragment
                = new TeacherProfileFragment();

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_layout_id, teacherProfileFragment)
                .commit();
    }

}