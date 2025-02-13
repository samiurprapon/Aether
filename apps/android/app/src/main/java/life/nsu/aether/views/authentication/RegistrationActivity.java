/*
 * RegistrationActivity Created by Samiur Prapon
 * Last modified  8/15/21, 3:22 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.authentication;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.RadioGroup;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.viewModels.authentication.RegistrationViewModel;

public class RegistrationActivity extends AppCompatActivity {

    private RegistrationViewModel viewModel;
    CustomProgressBar progressBar;

    private TextInputEditText mEmail;
    private TextInputEditText mPassword;
    private TextInputEditText mConfirmPassword;

    RadioGroup mType;
    MaterialButton mSignUp;
    MaterialButton mLogin;

    private String type = "STUDENT";

    @SuppressLint("NonConstantResourceId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        overridePendingTransition(R.anim.enter_from_right, R.anim.exit_to_left);

        setContentView(R.layout.activity_registration);

        mEmail = findViewById(R.id.et_email);
        mPassword = findViewById(R.id.et_password);
        mConfirmPassword = findViewById(R.id.et_confirm_password);
        mType = findViewById(R.id.radioGroup);
        mSignUp = findViewById(R.id.mb_sign_up);
        mLogin = findViewById(R.id.mb_sign_in);

        viewModel = new ViewModelProvider(this).get(RegistrationViewModel.class);
        progressBar = new CustomProgressBar(this);

        mSignUp.setOnClickListener(v -> {
            progressBar.show("");
            String email = Objects.requireNonNull(mEmail.getText()).toString();
            String password = Objects.requireNonNull(mPassword.getText()).toString();
            String confirmPassword = Objects.requireNonNull(mConfirmPassword.getText()).toString();

            if (!validation(password, confirmPassword)) {
                progressBar.hide();
                return;
            }

//            mSignUp.setError(null);
            new Handler(Looper.myLooper()).postDelayed(() -> viewModel.getMessageResponseLiveData(email, password, type).observe(this, messageResponse -> {
                progressBar.hide();
                viewModel.switchActivity(messageResponse);
            }), 500);

        });

        mType.setOnCheckedChangeListener((group, checkedId) -> {
            if (checkedId == R.id.rb_teacher) {
                type = "TEACHER";
            } else {
                type = "STUDENT";
            }
        });

        mLogin.setOnClickListener(v -> onBackPressed());
    }

    private boolean validation(String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            mConfirmPassword.setError("Not matched.");
            return false;
        }

        return password.length() >= 6;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
//        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
    }
}
