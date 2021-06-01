/*
 * UserCredential Created by Samiur Prapon
 * Last modified  6/1/21 5:51 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.models;

public class UserCredential {
    private String email;
    private String password;

    public UserCredential() {
        // empty constructor for Retrofit
    }

    public UserCredential(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
