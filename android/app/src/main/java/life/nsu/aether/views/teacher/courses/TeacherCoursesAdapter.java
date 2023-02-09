/*
 * TeacherCoursesAdapter Created by Samiur Prapon
 * Last modified  2/10/23, 1:56 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.teacher.courses;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import life.nsu.aether.R;

public class TeacherCoursesAdapter extends RecyclerView.Adapter<TeacherCoursesAdapter.ViewHolder> {

    private Context context;

    public TeacherCoursesAdapter(Context context) {
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.adapter_teacher_courses, parent,false);
        ViewHolder viewHolder = new ViewHolder(view);
        return  viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.courseLayout.setOnClickListener(v -> {
        });

    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public int getItemViewType(int position) {
        return position;
    }

    @Override
    public int getItemCount() {
        return 10;
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        LinearLayout courseLayout;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            courseLayout = itemView.findViewById(R.id.ly_courses);
        }
    }
}