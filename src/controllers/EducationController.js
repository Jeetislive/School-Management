import { statusCodes } from "../config/constants.js";
import EducationService from "../services/EducationService.js";
import { error, success } from "../utils/responseHelper.js";

const createEducation = async (req, res) => {
    try {
        const { title, institute, startDate, endDate, certificate, userId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const education = await EducationService.createEducation(title, institute, startDate, endDate, certificate, userId);
        // console.log("Education:",education);
        
        if (!education) {
            return error("", 'Error creating education', statusCodes.BAD_REQUEST)(res);
        }
        return success({education}, 'Education created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating education:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllEducations = async (req, res) => {
    try {
        const educations = await EducationService.getAllEducations();
        if (!educations) {
            return error("", 'Error fetching educations', statusCodes.BAD_REQUEST)(res);
        }
        return success({educations}, 'Educations fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getEducationById = async (req, res) => {
    try {
        const { id,userId } = req.params;
        const education = await EducationService.getEducationById(id,userId);
        if (!education) {
            return error("", 'Error fetching education', statusCodes.BAD_REQUEST)(res);
        }
        return success({education}, 'Education fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, institute, startDate, endDate, certificate, userId } = req.payload;
        const education = await EducationService.updateEducation(id, title, institute, startDate, endDate, certificate, userId);
        if (!education) {
            return error("", 'Error updating education', statusCodes.BAD_REQUEST)(res);
        }
        return success({education}, 'Education updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await EducationService.deleteEducation(id);
        if (!result) {
            return error("", 'Error deleting education', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Education deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation
};