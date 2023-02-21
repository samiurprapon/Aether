/*
 * PageActivity Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 10:29 PM
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

            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_layout_id, teacherProfileEditFragment)
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