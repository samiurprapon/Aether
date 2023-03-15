/*
 * PageActivity Created by Samiur Prapon
 * Last modified  2/23/23, 4:10 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.Toast;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;
import life.nsu.aether.views.teacher.courses.TeacherCourseFragment;
import life.nsu.aether.views.teacher.courses.TeacherModifyCourseFragment;
import life.nsu.aether.views.teacher.profile.TeacherProfileEditFragment;

public class PageActivity extends AppCompatActivity {

    String selectedFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page);

        selectedFragment = getIntent().getExtras().getString(getResources().
                getString(R.string.selected_fragment));

        if(selectedFragment.equals(getResources().getString(R.string.teacher_profile_edit))){
            TeacherProfileEditFragment teacherProfileEditFragment
                    = new TeacherProfileEditFragment();

            String name = getIntent().getExtras().getString(getResources().
                    getString(R.string.title_name));
            String initial = getIntent().getExtras().getString(getResources().
                    getString(R.string.title_initial));
            String school = getIntent().getExtras().getString(getResources().
                    getString(R.string.title_school));
            String gender = getIntent().getExtras().getString(getResources().
                    getString(R.string.title_gender));

            Bundle args = new Bundle();
            args.putSerializable(getResources().getString(R.string.title_name), name);
            args.putString(getResources().getString(R.string.title_initial), initial);
            args.putSerializable(getResources().getString(R.string.title_school), school);
            args.putString(getResources().getString(R.string.title_gender), gender);
            teacherProfileEditFragment.setArguments(args);

            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_layout_id, teacherProfileEditFragment)
                    .commit();
        }else if(selectedFragment.equals(getResources().getString(R.string.teacher_course))){
            TeacherCourseFragment teacherCourseFragment
                    = new TeacherCourseFragment();

            Course course = (Course) getIntent().
                    getSerializableExtra(getResources().getString(R.string.intent_course_name));
            String courseId = getIntent().getExtras().getString(
                    getResources().getString(R.string.intent_course_id)
            );

            Bundle args = new Bundle();
            args.putSerializable(getResources().getString(R.string.intent_course_name), course);
            args.putString(getResources().getString(R.string.intent_course_id), courseId);
            teacherCourseFragment.setArguments(args);

            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_layout_id, teacherCourseFragment)
                    .commit();
        }else if(selectedFragment.equals(getResources().getString(R.string.teacher_modify_course))){
            TeacherModifyCourseFragment teacherModifyCourseFragment
                    = new TeacherModifyCourseFragment();

            boolean isModify = getIntent().getExtras().getBoolean(
                    getResources().getString(R.string.teacher_modify_course));

            Bundle args = new Bundle();
            args.putBoolean(getResources().getString(R.string.teacher_modify_course), isModify);
            teacherModifyCourseFragment.setArguments(args);

            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_layout_id, teacherModifyCourseFragment)
                    .commit();
        }

    }

    // on screen touch editText focus off
    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_DOWN) {
            View v = getCurrentFocus();
            if ( v instanceof EditText) {
                Rect outRect = new Rect();
                v.getGlobalVisibleRect(outRect);
                if (!outRect.contains((int)event.getRawX(), (int)event.getRawY())) {
                    v.clearFocus();
                    InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                }
            }
        }
        return super.dispatchTouchEvent( event );
    }

}