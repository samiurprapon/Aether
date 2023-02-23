/*
 * CourseRecyclerAdapter Created by Mahfuj Ahmed Jim
 * Last modified  8/3/21, 9:02 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelStoreOwner;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.android.gms.vision.text.Text;
import com.google.android.material.card.MaterialCardView;

import java.util.List;
import java.util.Random;

import life.nsu.aether.R;
import life.nsu.aether.models.Course;
import life.nsu.aether.viewModels.teacher.TeacherCourseViewModel;
import life.nsu.aether.views.PageActivity;

public class TeacherOnGoingCourseAdapter extends RecyclerView.Adapter<TeacherOnGoingCourseAdapter.ViewHolder> {

    Context mContext;
    LayoutInflater layoutInflater;
    List<Course> courseList;
    TeacherCourseViewModel viewModel;

    public TeacherOnGoingCourseAdapter(Context context) {
        this.mContext = context;
        layoutInflater = LayoutInflater.from(mContext);
        viewModel = new ViewModelProvider((ViewModelStoreOwner) mContext).get(TeacherCourseViewModel.class);
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
            holder.courseTitle.setText(course.getName());
            holder.courseCode.setText(course.getCode()+"."+course.getSection());
            holder.courseSemester.setText(course.getSemester());

            holder.cardView.setOnClickListener(view -> {
                Intent intent = new Intent(mContext, PageActivity.class);
                intent.putExtra(mContext.getResources()
                                .getString((R.string.selected_fragment)),
                                mContext.getResources().getString(R.string.teacher_course));
                intent.putExtra(mContext.getResources()
                                .getString(R.string.intent_course_name), course);
                intent.putExtra(mContext.getResources()
                        .getString(R.string.intent_course_id), course.getId());
                mContext.startActivity(intent);
            });

            holder.archiveButton.setOnClickListener(view -> {
                viewModel.archiveTeacherCourseResponseMutableLiveData(course.getId());
            });
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
        MaterialCardView cardView;
        TextView courseTitle;
        TextView courseCode;
        TextView courseSemester;
        ImageButton archiveButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mCourseAvatar = itemView.findViewById(R.id.iv_course_avatar);
            cardView = itemView.findViewById(R.id.mcv_teacher_courses);
            courseTitle = itemView.findViewById(R.id.tv_course_title);
            courseCode = itemView.findViewById(R.id.tv_course_code);
            courseSemester = itemView.findViewById(R.id.tv_course_semester);
            archiveButton = itemView.findViewById(R.id.ib_archive);
        }
    }
}
