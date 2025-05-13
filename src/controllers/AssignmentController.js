import { statusCodes } from "../config/constants.js";
import AssignmentService from "../services/AssignmentService.js";
import { error, success } from "../utils/responseHelper.js";

const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints  } = req.payload;
        // console.log("req.payload",req.payload);
        
        const assignment = await AssignmentService.createAssignment(title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints);
        // console.log("Assignment:",assignment);
        
        if (!assignment) {
            return error("", 'Error creating assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignment}, 'Assignment created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating assignment:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllAssignments = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const assignments = await AssignmentService.getAllAssignments(schoolId);
        if (!assignments) {
            return error("", 'Error fetching assignments', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignments}, 'Assignments fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await AssignmentService.getAssignmentById(id);
        if (!assignment) {
            return error("", 'Error fetching assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignment}, 'Assignment fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAssignmentByClassId = async (req, res) => {
    try {
        const { classId,schoolId } = req.params;
        const assignment = await AssignmentService.getAssignmentByClassId(classId,schoolId);
        if (!assignment) {
            return error("", 'Error fetching assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignment}, 'Assignment fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAssignmentByTeacherId = async (req, res) => {
    try {
        const { teacherId,schoolId } = req.params;
        const assignment = await AssignmentService.getAssignmentByTeacherId(teacherId,schoolId);
        if (!assignment) {
            return error("", 'Error fetching assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignment}, 'Assignment fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints } = req.payload;
        const assignment = await AssignmentService.updateAssignment(id, title, description, dueDate, teacherId, classId, schoolId, fileURL, subjectId, status, maxPoints);
        if (!assignment) {
            return error("", 'Error updating assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({assignment}, 'Assignment updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AssignmentService.deleteAssignment(id);
        if (!result) {
            return error("", 'Error deleting assignment', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Assignment deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentByClassId,
    getAssignmentByTeacherId,
    updateAssignment,
    deleteAssignment
};