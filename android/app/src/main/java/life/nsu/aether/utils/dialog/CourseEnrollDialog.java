/*
 * CourseEnrollDialog Created by Mahfuj Ahmed Jim
 * Last modified  3/8/23, 11:44 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.dialog;

import android.app.Activity;
import android.app.Dialog;

import life.nsu.aether.R;

public class CourseEnrollDialog {

    private Activity activity;
    private Dialog dialog;

    public CourseEnrollDialog(Activity activity) {
        this.activity = activity;
        setUpDialog();
    }

    public void show(){
        dialog.show();
    }

    public void dismiss(){
        dialog.dismiss();
    }

    private void setUpDialog() {
        dialog = new Dialog(activity);
        dialog.setContentView(R.layout.dialog_enroll_course);
        dialog.setCancelable(true);
    }

}
