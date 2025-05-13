import { statusCodes } from "../config/constants.js";
import ExperienceService from "../services/ExperienceService.js";
import { error, success } from "../utils/responseHelper.js";

const createExperience = async (req, res) => {
    try {
        const { organization_name, position, startDate, endDate, schoolId } = req.payload;
        const { id } = req.auth.credentials;
        // console.log("req.auth.credentials",req.auth.credentials.id,id);
        // console.log("req.payload",req.payload);
        
        const experience = await ExperienceService.createExperience(organization_name, position, startDate, endDate, id, schoolId);
        // console.log("Experience:",experience);
        
        if (!experience) {
            return error("", 'Error creating experience', statusCodes.BAD_REQUEST)(res);
        }
        return success({experience}, 'Experience created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating experience:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllExperiences = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const experiences = await ExperienceService.getAllExperiences(schoolId);
        if (!experiences) {
            return error("", 'Error fetching experiences', statusCodes.BAD_REQUEST)(res);
        }
        return success({experiences}, 'Experiences fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getExperienceById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const userId = req.auth.credentials.id;
        const experience = await ExperienceService.getExperienceById(id,schoolId,userId);
        if (!experience) {
            return error("", 'Error fetching experience', statusCodes.BAD_REQUEST)(res);
        }
        return success({experience}, 'Experience fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { organization_name, position, startDate, endDate, userId, schoolId } = req.payload;
        const experience = await ExperienceService.updateExperience(id, organization_name, position, startDate, endDate, userId, schoolId);
        if (!experience) {
            return error("", 'Error updating experience', statusCodes.BAD_REQUEST)(res);
        }
        return success({experience}, 'Experience updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ExperienceService.deleteExperience(id);
        if (!result) {
            return error("", 'Error deleting experience', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Experience deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
};