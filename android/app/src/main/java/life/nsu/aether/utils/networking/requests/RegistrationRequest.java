/*
 * RegistrationRequest Created by Samiur Prapon
 * Last modified  6/1/21 8:05 AM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.requests;

public class RegistrationRequest {
    private String email;
    private String password;
    private String type;

    public RegistrationRequest(String email, String password, String type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
