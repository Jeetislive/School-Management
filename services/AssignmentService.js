import { Assignment } from "../models/Assignment.js";


const createAssignment = async (title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints) => {
    try {
        const existingAssignment = await Assignment.findOne({ where: { classId, title, schoolId, teacherId } });
        if (existingAssignment) {
            console.log('Assignment already exists:', existingAssignment);
            return null; // or throw an log if you prefer
        }
        const assignment = await Assignment.create({ title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints });
        return assignment;
    } catch (err) {
        console.log('Error creating assignment:', err);
        return null;
    }
};
const getAllAssignments = async (schoolId) => {
    try {
        const assignments = await Assignment.findAll(
            { where: { schoolId } }
        );
        return assignments;

    } catch (err) {
        console.log('Error fetching assignments:', err);
        return null;
    }
};
const getAssignmentById = async (id) => {
    try {
        const assignment = await Assignment.findOne({ where: { id } });
        return assignment;
    } catch (err) {
        console.log('Error fetching assignment:', err);
        return null;
    }
};
const getAssignmentByClassId = async (classId,schoolId) => {
    try {
        const assignment = await Assignment.findAll({ where: { classId, schoolId } });
        return assignment;
    } catch (err) {
        console.log('Error fetching assignment:', err);
        return null;
    }
};
const updateAssignment = async (id, title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints) => {
    try {
        const assignment = await Assignment.findOne({ where: { id } });
        if (!assignment) {
            return null;
        }
        assignment.title = title || assignment.title;
        assignment.description = description || assignment.description;
        assignment.dueDate = dueDate || assignment.dueDate;
        assignment.teacherId = teacherId || assignment.teacherId;
        assignment.classId = classId || assignment.classId;
        assignment.schoolId = schoolId || assignment.schoolId;
        assignment.fileURL = fileURL || assignment.fileURL;
        assignment.subjectId = subjectId || assignment.subjectId;
        assignment.status = status || assignment.status;
        assignment.maxPoints = maxPoints || assignment.maxPoints;
        await assignment.save();
        return assignment;
    } catch (err) {
        console.log('Error updating assignment:', err);
        return null;
    }
};
const deleteAssignment = async (id) => {
    try {
        const assignment = await Assignment.findOne({ where: { id } });
        if (!assignment) {
            return null;
        }
        await assignment.destroy();
        return assignment;
    } catch (err) {
        console.log('Error deleting assignment:', err);
        return null;
    }
};
export default {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentByClassId,
    updateAssignment,
    deleteAssignment,
};