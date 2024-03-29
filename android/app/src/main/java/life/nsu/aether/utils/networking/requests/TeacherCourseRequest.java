/*
 * TeacherCourseRequest Created by Mahfuj Ahmed Jim
 * Last modified  2/23/23, 3:59 AM
 * Copyright (c) 2023. All rights reserved.
 *
 */

package life.nsu.aether.utils.networking.requests;

public class TeacherCourseRequest {

    private String courseId;
    private boolean archive;
    private String name;
    private int section;
    private String code;
    private String semester;

    public TeacherCourseRequest(String courseId) {
        this.courseId = courseId;
    }

    public TeacherCourseRequest(String courseId, boolean archive) {
        this.courseId = courseId;
        this.archive = archive;
    }

    public TeacherCourseRequest(String name, int section, String code, String semester) {
        this.name = name;
        this.section = section;
        this.code = code;
        this.semester = semester;
    }

    public TeacherCourseRequest(String courseId, String name, int section, String code, String semester) {
        this.courseId = courseId;
        this.name = name;
        this.section = section;
        this.code = code;
        this.semester = semester;
    }
}
