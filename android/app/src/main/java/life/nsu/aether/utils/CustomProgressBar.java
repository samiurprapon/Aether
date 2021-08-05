/*
 * CustomProgressBar Created by Samiur Prapon
 * Last modified  8/5/21, 10:44 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.graphics.BlendMode;
import android.graphics.BlendModeColorFilter;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.res.ResourcesCompat;

import life.nsu.aether.R;


public class CustomProgressBar {

    private Dialog dialog;

    private TextView mTitle;

    private ConstraintLayout layout;

    public CustomProgressBar(Context context) {
        LayoutInflater inflater = LayoutInflater.from(context);

        @SuppressLint("InflateParams")
        View view = inflater.inflate(R.layout.dialog_prograss_bar, null);

        mTitle = view.findViewById(R.id.cp_title);
        CardView mCardView = view.findViewById(R.id.cp_cardview);
        layout = view.findViewById(R.id.cp_bg_view);
        ProgressBar mProgressBar = view.findViewById(R.id.cp_pbar);

        layout.setBackgroundColor(Color.parseColor("#60000000"));
        mCardView.setCardBackgroundColor(Color.parseColor("#70000000"));

        setColorFilter(mProgressBar.getIndeterminateDrawable(), ResourcesCompat.getColor(context.getResources(), R.color.white_40, null));

        dialog = new Dialog(context, R.style.CustomProgressBarTheme);
        dialog.setContentView(view);

    }

    public void show(String message) {
        mTitle.setTextColor(Color.WHITE);
        mTitle.setText(message);

        dialog.show();

    }

    public void hide() {
        dialog.dismiss();
    }


    private void setColorFilter(Drawable drawable, int color) {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            drawable.setColorFilter(new BlendModeColorFilter(color, BlendMode.SRC_ATOP));
        } else {
            drawable.setColorFilter(color, PorterDuff.Mode.SRC_ATOP);

        }
    }

}