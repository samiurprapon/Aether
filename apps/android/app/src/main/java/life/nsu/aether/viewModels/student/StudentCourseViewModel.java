/*
 * StudentCourseViewModel Created by Mahfuj Ahmed Jim
 * Last modified  3/8/23, 12:40 PM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.student;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import life.nsu.aether.repositories.student.StudentCourseRepository;
import life.nsu.aether.repositories.student.StudentProfileRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.StudentCourseResponse;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;

public class StudentCourseViewModel extends AndroidViewModel {

    StudentCourseRepository courseRepository;
    Preference preference;

    public StudentCourseViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);

        courseRepository = StudentCourseRepository.getInstance(application);
    }

    public LiveData<StudentCourseResponse> postStudentEnrollCourseResponseMutableLiveData(String enrollCode) {
        return courseRepository.postStudentEnrollCourseResponseMutableLiveData(preference.getAccessToken(), enrollCode);
    }

}
