import { statusCodes } from "../config/constants.js";
import SubjectService from "../services/SubjectService.js";
import { error, success } from "../utils/responseHelper.js";

const createSubject = async (req, res) => {
    try {
        const { name, code, schoolId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const subject = await SubjectService.createSubject(name, code, schoolId);
        // console.log("Subject:",subject);
        
        if (!subject) {
            return error("", 'Error creating subject', statusCodes.BAD_REQUEST)(res);
        }
        return success({subject}, 'Subject created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating subject:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllSubjects = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const subjects = await SubjectService.getAllSubjects(schoolId);
        if (!subjects) {
            return error("", 'Error fetching subjects', statusCodes.BAD_REQUEST)(res);
        }
        return success({subjects}, 'Subjects fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getSubjectById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const subject = await SubjectService.getSubjectById(id,schoolId);
        if (!subject) {
            return error("", 'Error fetching subject', statusCodes.BAD_REQUEST)(res);
        }
        return success({subject}, 'Subject fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, contactEmail, isActive } = req.payload;
        const subject = await SubjectService.updateSubject(id, name, address, contactEmail, isActive);
        if (!subject) {
            return error("", 'Error updating subject', statusCodes.BAD_REQUEST)(res);
        }
        return success({subject}, 'Subject updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await SubjectService.deleteSubject(id);
        if (!result) {
            return error("", 'Error deleting subject', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Subject deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};