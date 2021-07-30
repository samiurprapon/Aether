/*
 * HomePageFragmentSliderAdapter Created by Samiur Prapon
 * Last modified  24/7/21, 3:02 pm
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import java.util.ArrayList;

public class HomePageFragmentSliderAdapter extends FragmentStatePagerAdapter {

    ArrayList<Fragment> fragments;

    public HomePageFragmentSliderAdapter(ArrayList<Fragment> fragments, FragmentManager fm, int behavior) {
        super(fm, behavior);
        this.fragments = fragments;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        return fragments.get(position);
    }

    @Override
    public int getCount() {
        return fragments.size();
    }
}
