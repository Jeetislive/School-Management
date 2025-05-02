import ClassService from "../services/ClassService.js";
import { error, success } from "../utils/responseHelper.js";

const createClass = async (req, res) => {
    try {
        const { name, schoolId, departmentId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const classData = await ClassService.createClass(name, schoolId, departmentId);
        // console.log("Class:",classData);
        
        if (!classData) {
            return error("", 'Error creating class', 400)(res);
        }
        return success({classData}, 'Class created successfully', 201)(res);
    } catch (err) {
        console.log('Error creating class:', err);
        // console.log(er);
        return error("","Internal Server Error")(res);
    }
};
const getAllClassesBySchoolId = async (req, res) => {
    try {
        const { schoolId } = req.params;
        // console.log("req.params",req.params);
        const classes = await ClassService.getAllClassesBySchoolId(schoolId);
        if (!classes) {
            return error("", 'Error fetching classes', 400)(res);
        }
        return success({classes}, 'Classes fetched successfully', 200)(res);
    } catch (er) {
        console.log(er);
        return error("","Internal Server Error")(res);
    }
};
const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const classData = await ClassService.getClassById(id);
        if (!classData) {
            return error("", 'Error fetching class', 400)(res);
        }
        return success({classData}, 'Class fetched successfully', 200)(res);
    } catch (er) {
        console.log(er);
        return error("","Internal Server Error")(res);
    }
};
const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, schoolId } = req.payload;
        const classData = await ClassService.updateClass(id, name, description, schoolId);
        if (!classData) {
            return error("", 'Error updating class', 400)(res);
        }
        return success({classData}, 'Class updated successfully', 200)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error")(res);
    }
};
const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const classData = await ClassService.deleteClass(id);
        if (!classData) {
            return error("", 'Error deleting class', 400)(res);
        }
        return success({classData}, 'Class deleted successfully', 200)(res);
    } catch (er) {
        console.log(er);
        return error("","Internal Server Error")(res);
    }
};

export default {
    createClass,
    getAllClassesBySchoolId,
    getClassById,
    updateClass,
    deleteClass,
};