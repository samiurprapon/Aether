/*
 * TeacherCourseViewModel Created by Mahfuj Ahmed Jim
 * Last modified  2/22/23, 2:13 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */
​
package life.nsu.aether.viewModels.teacher;
​
import android.app.Application;
​
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
​
import java.util.ArrayList;
import java.util.List;
​
import life.nsu.aether.models.Course;
import life.nsu.aether.repositories.teacher.TeacherCourseRepository;
import life.nsu.aether.utils.Preference;
import life.nsu.aether.utils.networking.responses.TeacherCoursesResponse;
​
public class TeacherCourseViewModel extends AndroidViewModel {
​
    TeacherCourseRepository courseRepository;
    Preference preference;
​
    public TeacherCourseViewModel(@NonNull Application application) {
        super(application);
        preference = new Preference(application);
        courseRepository =  TeacherCourseRepository.getInstance(application);
    }
​
    public LiveData<TeacherCoursesResponse> getTeacherCourseResponseMutableLiveData(){
        return courseRepository
                .getTeacherCourseResponseMutableLiveData(preference.getAccessToken());
    }
​
    public LiveData<TeacherCoursesResponse> getTeacherArchiveCourseResponseMutableLiveData(){
        return courseRepository
                .getTeacherArchiveCourseResponseMutableLiveData(preference.getAccessToken());
    }
​
    public LiveData<TeacherCoursesResponse> addTeacherCourseResponseMutableLiveData(String name, int section, String code, String semester){
        return courseRepository
                .addTeacherCourseResponseMutableLiveData(preference.getAccessToken(), name, section, code, semester);
    }
​
    public LiveData<TeacherCoursesResponse> updateTeacherCourseResponseMutableLiveData(String courseId, String name, int section, String code, String semester){
        return courseRepository
                .updateTeacherCourseResponseMutableLiveData(preference.getAccessToken(), courseId, name, section, code, semester);
    }
​
    public LiveData<TeacherCoursesResponse> deleteTeacherCourseResponseMutableLiveData(String courseId){
        return courseRepository
                .deleteTeacherCourseResponseMutableLiveData(preference.getAccessToken(), courseId);
    }
​
    public LiveData<TeacherCoursesResponse> archiveTeacherCourseResponseMutableLiveData(String courseId){
        return courseRepository
                .archiveTeacherCourseResponseMutableLiveData(preference.getAccessToken(), courseId);
    }
​
}