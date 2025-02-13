/*
 * EditProfileFragment Created by Samiur Prapon
 * Last modified  2/5/23, 10:19 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.views.student.profile;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import life.nsu.aether.R;

public class EditProfileFragment extends Fragment {

    static EditProfileFragment fragment = null;

    public static EditProfileFragment newInstance() {
        if (fragment == null) {
            synchronized (EditProfileFragment.class) {
                if (fragment == null) {
                    return new EditProfileFragment();
                }
            }
        }

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_edit_profile, container, false);
    }
}