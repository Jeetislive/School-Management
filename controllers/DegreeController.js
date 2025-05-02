import { statusCodes } from "../config/constants.js";
import DegreeService from "../services/DegreeService.js";
import { error, success } from "../utils/responseHelper.js";

const createDegree = async (req, res) => {
    try {
        const { name, schoolId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const degree = await DegreeService.createDegree(name, schoolId);
        // console.log("Degree:",degree);
        
        if (!degree) {
            return error("", 'Error creating degree', statusCodes.BAD_REQUEST)(res);
        }
        return success({degree}, 'Degree created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating degree:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllDegrees = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const degrees = await DegreeService.getAllDegrees(schoolId);
        if (!degrees) {
            return error("", 'Error fetching degrees', statusCodes.BAD_REQUEST)(res);
        }
        return success({degrees}, 'Degrees fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getDegreeById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const degree = await DegreeService.getDegreeById(id,schoolId);
        if (!degree) {
            return error("", 'Error fetching degree', statusCodes.BAD_REQUEST)(res);
        }
        return success({degree}, 'Degree fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateDegree = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, schoolId } = req.payload;
        const degree = await DegreeService.updateDegree(id, name, schoolId);
        if (!degree) {
            return error("", 'Error updating degree', statusCodes.BAD_REQUEST)(res);
        }
        return success({degree}, 'Degree updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteDegree = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DegreeService.deleteDegree(id);
        if (!result) {
            return error("", 'Error deleting degree', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Degree deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createDegree,
    getAllDegrees,
    getDegreeById,
    updateDegree,
    deleteDegree
};