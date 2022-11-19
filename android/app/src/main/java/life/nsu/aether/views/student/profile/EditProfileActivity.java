/*
 * EditProfileActivity Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.student.profile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.RadioGroup;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.utils.networking.responses.StudentProfileDetailsResponse;
import life.nsu.aether.viewModels.student.StudentProfileViewModel;

public class EditProfileActivity extends AppCompatActivity {

    StudentProfileViewModel studentProfileViewModel;
    CustomProgressBar progressBar;
    MaterialButton saveDetailsButton;
    TextInputEditText textInputEditTextName, textInputEditTextStudentId;
    RadioGroup genderSelectionRadioGroup;
    boolean fetchProfileData = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        studentProfileViewModel = new ViewModelProvider(this).get(StudentProfileViewModel.class);
        saveDetailsButton = findViewById(R.id.mb_save);
        textInputEditTextName = findViewById(R.id.et_name);
        textInputEditTextStudentId = findViewById(R.id.et_student_id);
        genderSelectionRadioGroup = findViewById(R.id.radioGroup);
        fetchProfileData = getIntent().getBooleanExtra("fetch_profile_data", false);
        progressBar = new CustomProgressBar(this);
        if(fetchProfileData){
            // Fetch students previous data and place them on ui for editing profile
            studentProfileViewModel.getStudentProfileDetailsResponseMutableLiveData().observe(this, this::changeUiAccordingToStudentsProfileData);
        }else{
            // Let student complete their profile for the first time in app
            initSaveButtonListener();
        }
    }

    private void changeUiAccordingToStudentsProfileData(StudentProfileDetailsResponse studentProfileDetailsResponse) {
        textInputEditTextName.setText(studentProfileDetailsResponse.getStudent().getUser().getName());
        if(studentProfileDetailsResponse.getStudent().getUser().getSex().equals("male")){
            genderSelectionRadioGroup.check(R.id.rb_male);
        }else{
            genderSelectionRadioGroup.check(R.id.rb_female);
        }
    }

    private void initSaveButtonListener() {
        textInputEditTextName.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }
            @Override
            public void afterTextChanged(Editable s) {
                saveDetailsButton.setEnabled(!s.toString().isEmpty() && !Objects.requireNonNull(textInputEditTextStudentId.getText()).toString().isEmpty());
            }
        });
        textInputEditTextStudentId.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }
            @Override
            public void afterTextChanged(Editable s) {
                saveDetailsButton.setEnabled(!s.toString().isEmpty() && !Objects.requireNonNull(textInputEditTextName.getText()).toString().isEmpty());
            }
        });
        saveDetailsButton.setOnClickListener(v -> {
            String name = Objects.requireNonNull(textInputEditTextName.getText()).toString();
            String studentId = Objects.requireNonNull(textInputEditTextStudentId.getText()).toString();
            String gender;
            if(genderSelectionRadioGroup.getCheckedRadioButtonId()==R.id.rb_male){
                gender = "male";
            }else{
                gender = "female";
            }
            progressBar.show("Updating Profile");
            studentProfileViewModel.getProfileUpdateResponseLiveData(name, gender, studentId).observe(EditProfileActivity.this, studentProfileDetailsResponse -> {
                progressBar.hide();
                if(studentProfileDetailsResponse.getSuccess()){
                    if(fetchProfileData){
                        // As this means the user was updating his profile so we can simply destroy this activity
                        finish();
                    }else{
                        // Otherwise the user was adding his profile for the first time so let's redirect him to home activity
                       studentProfileViewModel.switchActivity(studentProfileDetailsResponse);
                    }
                }
            });
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}