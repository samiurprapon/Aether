/*
 * LoginActivity Created by Samiur Prapon
 * Last modified  7/15/21, 7:39 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.views;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import life.nsu.aether.R;

public class LoginActivity extends AppCompatActivity {

    TextInputEditText mEmail;
    TextInputEditText mPassword;
    MaterialButton mForgetPassword;
    MaterialButton mLogin;
    MaterialButton mRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);

        setContentView(R.layout.activity_login);

        mEmail = findViewById(R.id.et_email);
        mPassword = findViewById(R.id.et_password);
        mForgetPassword = findViewById(R.id.mb_forgot_password);
        mLogin = findViewById(R.id.mb_sign_in);
        mRegister = findViewById(R.id.mb_register);

        mLogin.setOnClickListener(v -> {

        });

        mRegister.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
            startActivity(intent);
        });

    }
}