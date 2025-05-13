import SchoolService from "../services/SchoolService.js";
import { error, success } from "../utils/responseHelper.js";

const createSchool = async (req, res) => {
    try {
        const { name, address, contactEmail, isActive } = req.payload;
        // console.log("req.payload",req.payload);
        
        const school = await SchoolService.createSchool(name, address, contactEmail, isActive);
        // console.log("School:",school);
        
        if (!school) {
            return error("", 'Error creating school', 400)(res);
        }
        return success({school}, 'School created successfully', 201)(res);
    } catch (error) {
        console.error('Error creating school:', error);
        // console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const getAllSchools = async (req, res) => {
    try {
        const schools = await SchoolService.getAllSchools();
        if (!schools) {
            return error("", 'Error fetching schools', 400)(res);
        }
        return success({schools}, 'Schools fetched successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const getSchoolById = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await SchoolService.getSchoolById(id);
        if (!school) {
            return error("", 'Error fetching school', 400)(res);
        }
        return success({school}, 'School fetched successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, contactEmail, isActive } = req.payload;
        const school = await SchoolService.updateSchool(id, name, address, contactEmail, isActive);
        if (!school) {
            return error("", 'Error updating school', 400)(res);
        }
        return success({school}, 'School updated successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await SchoolService.deleteSchool(id);
        if (!result) {
            return error("", 'Error deleting school', 400)(res);
        }
        return success({}, 'School deleted successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};

export default {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool,
};
