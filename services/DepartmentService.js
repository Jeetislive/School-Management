import { Department } from "../models/Department.js";

const createDepartment = async (name, schoolId) => {
    try {
        const existingDepartment = await Department.findOne({ where: { name, schoolId } });
        if (existingDepartment) {
            console.log('Department already exists:', existingDepartment);
            return null; // or throw an log if you prefer
        }
        const department = await Department.create({ name, schoolId });
        return department;
    } catch (err) {
        console.log('Error creating department:', err);
        return null;
    }
};
const getAllDepartments = async (schoolId) => {
    try {
        const departments = await Department.findAll(
            { where: { schoolId } }
        );
        return departments;
    } catch (err) {
        console.log('Error fetching departments:', err);
        return null;
    }
};
const getDepartmentById = async (id,schoolId) => {
    try {
        const department = await Department.findOne({ where: { id, schoolId } });
        return department;
    } catch (err) {
        console.log('Error fetching department:', err);
        return null;
    }
};
const updateDepartment = async (id, name, schoolId) => {
    try {
        const department = await Department.findOne({ where: { id } });
        if (!department) {
            return null;
        }
        department.name = name || department.name;
        department.schoolId = schoolId || department.schoolId;
        await department.save();
        return department;
    } catch (err) {
        console.log('Error updating department:', err);
        return null;
    }
};
const deleteDepartment = async (id) => {
    try {
        const department = await Department.findOne({ where: { id } });
        if (!department) {
            return null;
        }
        await department.destroy();
        return department;
    } catch (err) {
        console.log('Error deleting department:', err);
        return null;
    }
};
export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};