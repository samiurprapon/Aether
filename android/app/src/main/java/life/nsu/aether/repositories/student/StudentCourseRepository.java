/*
 * StudentCourseRepository Created by Mahfuj Ahmed Jim
 * Last modified  3/8/23, 12:24 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.repositories.student;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;

import life.nsu.aether.utils.networking.responses.ProfileValidityResponse;

public class StudentCourseRepository {

    Application application;
    MutableLiveData<ProfileValidityResponse> enrollCourseValidityResponseMutableLiveData;

    private static StudentCourseRepository courseRepository = null;

    public synchronized static StudentCourseRepository getInstance(Application application) {
        if (courseRepository == null) {
            courseRepository = new StudentCourseRepository(application);
        }
        return courseRepository;
    }

    private StudentCourseRepository(Application application) {
        this.application = application;

        enrollCourseValidityResponseMutableLiveData = new MutableLiveData<>();

    }
}
