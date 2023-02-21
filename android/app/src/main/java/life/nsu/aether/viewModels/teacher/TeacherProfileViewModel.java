/*
 * TeacherProfileViewModel Created by Mahfuj Ahmed Jim
 * Last modified  2/21/23, 3:07 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.viewModels.teacher;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import life.nsu.aether.repositories.teacher.TeacherProfileRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.TeacherProfileDetailsResponse;

public class TeacherProfileViewModel extends AndroidViewModel {

    TeacherProfileRepository profileRepository;
    Preference preference;

    public TeacherProfileViewModel(@NonNull Application application) {
        super(application);

        preference = new Preference(application);

        profileRepository = TeacherProfileRepository.getInstance(application);
    }
    public LiveData<TeacherProfileDetailsResponse> getTeacherProfileDetailsResponseMutableLiveData() {
        return profileRepository.getTeacherProfileDetailsResponseMutableLiveData(preference.getAccessToken());
    }

    public LiveData<TeacherProfileDetailsResponse> postMutableTeacherProfileRequest(String initial, String name, String sex){
        return  profileRepository.postMutableTeacherProfileRequest(preference.getAccessToken(), name, initial, sex);
    }

}
