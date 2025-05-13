import { statusCodes } from "../config/constants.js";
import ClassStudentService from "../services/ClassStudentService.js";
import { error, success } from "../utils/responseHelper.js";

const createClassStudent = async (req,res) => {
    try {
        console.log(req.payload);
        const { classId, studentId } = req.payload;
        const classStudent = await ClassStudentService.createClassStudent(classId, studentId);
        if (!classStudent) {
            return error("", "Error creating classStudent", statusCodes.BAD_REQUEST)(res);
        }
        return success({classStudent}, 'ClassStudent created successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log('Error creating classStudent:', err);
        // console.log(err);
        return null;
    }
};
const getAllClassStudents = async (req, res) => {
    try {
        const { classId } = req.params;
        const classStudents = await ClassStudentService.getAllClassStudents(classId);
        if (!classStudents) {
            return error("", 'Error fetching classStudents', statusCodes.BAD_REQUEST)(res);
        }
        return success({classStudents}, 'ClassStudents fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getClassStudentById = async (req, res) => {
    try {
        const { id,classId } = req.params;
        const classStudent = await ClassStudentService.getClassStudentById(id,classId);
        if (!classStudent) {
            return error("", 'Error fetching classStudent', statusCodes.BAD_REQUEST)(res);
        }
        return success({classStudent}, 'ClassStudent fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};

const updateClassStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { classId, studentId } = req.payload;
        const classStudent = await ClassStudentService.updateClassStudent(id, classId, studentId);
        if (!classStudent) {
            return error("", 'Error updating classStudent', statusCodes.BAD_REQUEST)(res);
        }
        return success({classStudent}, 'ClassStudent updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteClassStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ClassStudentService.deleteClassStudent(id);
        if (!result) {
            return error("", 'Error deleting classStudent', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'ClassStudent deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createClassStudent,
    getAllClassStudents,
    getClassStudentById,
    updateClassStudent,
    deleteClassStudent
};