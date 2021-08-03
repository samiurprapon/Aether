/*
 * Course Created by Samiur Prapon
 * Last modified  8/3/21, 8:56 PM
 * Copyright (c) 2021. All rights reserved.
 *
 */

package life.nsu.aether.models;

public class Course {

    private String id;
    private String name;
    private String section;
    private String enrollCode;
    private String semester;
    private boolean isArchived;
    private String teacherUid;

    public Course() {
        // required constructor
    }

    public Course(String name, boolean isArchived, String teacherUid) {
        this.name = name;
        this.isArchived = isArchived;
        this.teacherUid = teacherUid;
    }

    public String getName() {
        return name;
    }

    public String getSection() {
        return section;
    }

    public String getSemester() {
        return semester;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public String getEnrollCode() {
        return enrollCode;
    }

    public String getTeacherUid() {
        return teacherUid;
    }
}
