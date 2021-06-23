/*
 * RegistrationActivity Created by Samiur Prapon
 * Last modified  6/23/21, 12:54 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.RadioGroup;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import life.nsu.aether.R;
import life.nsu.aether.viewModels.RegistrationActivityViewModel;

public class RegistrationActivity extends AppCompatActivity {

    private RegistrationActivityViewModel viewModel;

    private TextInputEditText mEmail;
    private TextInputEditText mPassword;
    private TextInputEditText mConfirmPassword;
    private RadioGroup mType;
    private MaterialButton mSignUp;

    private String type;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        mEmail = findViewById(R.id.et_email);
        mPassword = findViewById(R.id.et_password);
        mConfirmPassword = findViewById(R.id.et_confirm_password);
        mType = findViewById(R.id.radioGroup);
        mSignUp = findViewById(R.id.mb_sign_up);


        viewModel = new ViewModelProvider(this).get(RegistrationActivityViewModel.class);
        viewModel.initialize();

        mSignUp.setOnClickListener(v -> {

            String email = mEmail.getText().toString();
            String password = mPassword.getText().toString();
            String confirmPassword = mConfirmPassword.getText().toString();

            if (!validation(password, confirmPassword)) {
                return;
            }

//            mSignUp.setError(null);
            new Handler(Looper.myLooper()).postDelayed(() -> {
                viewModel.register(email, password, type);

//                loadingDialog.hide();

            }, 250);

        });

        mType.setOnCheckedChangeListener((group, checkedId) -> {

//            mSignUp.setError(null);

            switch (checkedId) {
                case R.id.rb_student:
                    type = "student";
                    break;
                case R.id.rb_teacher:
                    type = "teacher";
                    break;

                default:
                    break;
            }
        });
    }

    private boolean validation(String password, String confirmPassword) {
        if (type.equals("null")) {
            mSignUp.setError("Select type");

            return false;
        }

        if (!password.equals(confirmPassword)) {
            mConfirmPassword.setError("Not matched.");
            return false;
        }

        return password.length() >= 6;
    }
}