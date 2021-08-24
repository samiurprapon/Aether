/*
 * ProfileUpdateRequest Created by Samiur Prapon
 * Last modified  24/8/21, 12:51 am
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.requests;

public class ProfileUpdateRequest {
    private int studentID;
    private String name;
    private String sex;

    public ProfileUpdateRequest(){
        // Default Constructor
    }

    public ProfileUpdateRequest(int studentID, String name, String sex) {
        this.studentID = studentID;
        this.name = name;
        this.sex = sex;
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
