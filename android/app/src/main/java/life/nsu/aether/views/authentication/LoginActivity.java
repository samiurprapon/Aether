/*
 * LoginActivity Created by Samiur Prapon
 * Last modified  8/6/21, 1:50 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views.authentication;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

import life.nsu.aether.R;
import life.nsu.aether.utils.CustomProgressBar;
import life.nsu.aether.viewModels.authentication.LoginViewModel;

public class LoginActivity extends AppCompatActivity {

    TextInputEditText mEmail;
    TextInputEditText mPassword;
    MaterialButton mForgotPassword;
    MaterialButton mLogin;
    MaterialButton mRegister;

    LoginViewModel viewModel;
    CustomProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);

        setContentView(R.layout.activity_login);

        viewModel = new ViewModelProvider(this).get(LoginViewModel.class);
        progressBar = new CustomProgressBar(this);

        mEmail = findViewById(R.id.et_email);
        mPassword = findViewById(R.id.et_password);
        mForgotPassword = findViewById(R.id.mb_forgot_password);
        mLogin = findViewById(R.id.mb_sign_in);
        mRegister = findViewById(R.id.mb_register);

        mLogin.setOnClickListener(v -> {
            mLogin.setEnabled(false); // prevent double clicking
            hideKeyboard(this, v);
            progressBar.show("");

            String email = Objects.requireNonNull(mEmail.getText()).toString();
            String password = Objects.requireNonNull(mPassword.getText()).toString();

            if (password.length() < 6) {
                progressBar.hide();
                return;
            }
            viewModel.getMessageResponseLiveData(email, password).observe(this, loginResponse -> {
                progressBar.hide();
                    viewModel.switchActivity(loginResponse);

            });
            mLogin.setEnabled(true);
        });

        mRegister.setOnClickListener(v -> {
            hideKeyboard(this, v);
            Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
            startActivity(intent);
        });

        mForgotPassword.setOnClickListener(v -> {
            hideKeyboard(this, v);
            Snackbar.make(v, "Not available right now!", Snackbar.LENGTH_SHORT).show();
        });

    }

    public void hideKeyboard(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
}