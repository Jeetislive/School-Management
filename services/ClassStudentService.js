import { ClassStudent } from "../models/ClassStudent.js";


const createClassStudent = async (classId, studentId) => {
    try {
        const existingClassStudent = await ClassStudent.findOne({ where: { classId, studentId } });
        if (existingClassStudent) {
            console.log('ClassStudent already exists:', existingClassStudent);
            return null; // or throw an log if you prefer
        }
        const classStudent = await ClassStudent.create({ classId, studentId });
        return classStudent;
    } catch (err) {
        console.log('Error creating classStudent:', err);
        return null;
    }
};
const getAllClassStudents = async (classId) => {
    try {
        const classStudents = await ClassStudent.findAll(
            { where: { classId } }
        );
        return classStudents;

    } catch (err) {
        console.log('Error fetching classStudents:', err);
        return null;
    }
};
const getClassStudentById = async (id,classId) => {
    try {
        const classStudent = await ClassStudent.findOne({ where: { id, classId } });
        
        return classStudent;
    } catch (err) {
        console.log('Error fetching classStudent:', err);
        return null;
    }
};
const updateClassStudent = async (id, classId, studentId) => {
    try {
        const classStudent = await ClassStudent.findOne({ where: { id } });
        if (!classStudent) {
            return null;
        }
        classStudent.classId = classId || classStudent.classId;
        classStudent.studentId = studentId || classStudent.studentId;
        await classStudent.save();
        return classStudent;
    } catch (err) {
        console.log('Error updating classStudent:', err);
        return null;
    }
};
const deleteClassStudent = async (id) => {
    try {
        const classStudent = await ClassStudent.findOne({ where: { id } });
        if (!classStudent) {
            return null;
        }
        await classStudent.destroy();
        return classStudent;
    } catch (err) {
        console.log('Error deleting classStudent:', err);
        return null;
    }
};
export default {
    createClassStudent,
    getAllClassStudents,
    getClassStudentById,
    updateClassStudent,
    deleteClassStudent,
};