/*
 * CourseRecyclerAdapter Created by Mahfuj Ahmed Jim
 * Last modified  8/3/21, 9:02 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.appcompat.widget.AppCompatTextView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.mikhaellopez.circularprogressbar.CircularProgressBar;

import java.util.List;
import java.util.Random;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;

public class TeacherCourseRecyclerAdapter extends RecyclerView.Adapter<TeacherCourseRecyclerAdapter.ViewHolder> {

    Context mContext;
    LayoutInflater layoutInflater;

    List<Course> courseList;

    public TeacherCourseRecyclerAdapter(Context context) {
        this.mContext = context;
        layoutInflater = LayoutInflater.from(mContext);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = layoutInflater.inflate(R.layout.item_teacher_ongoing_courses, parent, false);

        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        if (courseList != null) {
            Course course = courseList.get(position);

            setCourseAvatar(holder.mCourseAvatar);
        }
    }

    @Override
    public int getItemCount() {
        if (courseList != null) {
            return courseList.size();
        } else {
            return 0;
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
        notifyDataSetChanged();
    }

    public void setCourseAvatar(AppCompatImageView mCourseAvatar) {
        Random rand = new Random();
        int maxNumber = 3;

        int randomNumber = rand.nextInt(maxNumber);

        switch (randomNumber) {
            case 0:
                Glide.with(mContext)
                        .load(mCourseAvatar)
                        .placeholder(R.drawable.ic_course_avatar_1)
                        .circleCrop()
                        .into(mCourseAvatar);
                break;
            case 1:
                Glide.with(mContext)
                        .load(mCourseAvatar)
                        .placeholder(R.drawable.ic_course_avatar_2)
                        .circleCrop()
                        .into(mCourseAvatar);
                break;
            case 2:
                Glide.with(mContext)
                        .load(mCourseAvatar)
                        .placeholder(R.drawable.ic_course_avatar_3)
                        .circleCrop()
                        .into(mCourseAvatar);
                break;
        }
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        AppCompatImageView mCourseAvatar;
        //AppCompatTextView mCourseTitle;
        //AppCompatTextView mCourseInstructor;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            mCourseAvatar = itemView.findViewById(R.id.iv_course_avatar);
        }
    }
}
