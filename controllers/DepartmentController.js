import { statusCodes } from "../config/constants.js";
import DepartmentService from "../services/DepartmentService.js";
import { error, success } from "../utils/responseHelper.js";

const createDepartment = async (req, res) => {
    try {
        const { name, schoolId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const department = await DepartmentService.createDepartment(name, schoolId);
        // console.log("Department:",department);
        
        if (!department) {
            return error("", 'Error creating department', statusCodes.BAD_REQUEST)(res);
        }
        return success({department}, 'Department created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating department:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllDepartments = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const departments = await DepartmentService.getAllDepartments(schoolId);
        if (!departments) {
            return error("", 'Error fetching departments', statusCodes.BAD_REQUEST)(res);
        }
        return success({departments}, 'Departments fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getDepartmentById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const department = await DepartmentService.getDepartmentById(id,schoolId);
        if (!department) {
            return error("", 'Error fetching department', statusCodes.BAD_REQUEST)(res);
        }
        return success({department}, 'Department fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, schoolId } = req.payload;
        const department = await DepartmentService.updateDepartment(id, name, schoolId);
        if (!department) {
            return error("", 'Error updating department', statusCodes.BAD_REQUEST)(res);
        }
        return success({department}, 'Department updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DepartmentService.deleteDepartment(id);
        if (!result) {
            return error("", 'Error deleting department', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Department deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};