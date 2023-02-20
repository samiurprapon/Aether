/*
 * StudentProfileViewModel Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.student;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.Objects;

import life.nsu.aether.repositories.StudentProfileRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import life.nsu.aether.views.student.StudentHomeActivity;

public class StudentProfileViewModel extends AndroidViewModel {

    StudentProfileRepository profileRepository;
    Preference preference;

    public StudentProfileViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);

        profileRepository = StudentProfileRepository.getInstance(application);
    }

    public void switchActivity(StudentProfileDetailsResponse profileDetailsResponse) {
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> {
            Intent intent;
            if(profileDetailsResponse.getSuccess()){
                intent = new Intent(getApplication().getApplicationContext(), StudentHomeActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                getApplication().getApplicationContext().startActivity(intent);
            }
        }, 250);
    }


    public LiveData<StudentProfileDetailsResponse> getStudentProfileDetailsResponseMutableLiveData() {
        return profileRepository.getStudentProfileDetailsResponseMutableLiveData(preference.getAccessToken());
    }

    public LiveData<StudentProfileDetailsResponse> getProfileUpdateResponseLiveData(String name, String gender, String studentId) {
        return profileRepository.getStudentProfileUpdateResponseLiveData(preference.getAccessToken(), name, gender, studentId);
    }
}
