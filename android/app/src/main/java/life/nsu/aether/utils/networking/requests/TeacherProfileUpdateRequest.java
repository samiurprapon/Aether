/*
 * TeacherProfileUpdateRequest Created by Mahfuj Ahmed Jim
 * Last modified  2/22/23, 12:20 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.requests;

public class TeacherProfileUpdateRequest {

    private String initial;
    private String name;
    private String school;
    private String sex;

    public TeacherProfileUpdateRequest(String initial, String name, String school, String sex) {
        this.initial = initial;
        this.name = name;
        this.school = school;
        this.sex = sex;
    }

}
