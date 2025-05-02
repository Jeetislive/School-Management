import { Class } from "../models/Class.js";
import { Department } from "../models/Department.js";
import { School } from "../models/School.js";

const createClass = async (name, schoolId, departmentId) => {
    try {
        const existingClass = await Class.findOne({ where: { name } });
        if (existingClass) {
            return null;
        }
        const classData = await Class.create({
            name,
            schoolId,
            departmentId,
        });
        // console.log("Class:",classData);
        return classData;
    } catch (err) {
        console.log('Error creating class:', err);
        return null; // Return null if there was an error
    }
};
const getAllClassesBySchoolId = async (id) => {
    try {
        const classes = await Class.findAll({
            where: { schoolId: id },
            order: [['createdAt', 'DESC']],
        });
        return classes;
    } catch (er) {
        console.log('Error fetching classes:', er);
        return null;
    }
};
const getClassById = async (id) => {
    try {
        const classData = await Class.findByPk(id, {
            order: [['createdAt', 'DESC']],
        });
        return classData;
    } catch (err) {
        console.log('Error fetching class:', err);
        return null;
    }
};
const updateClass = async (id, name, description, schoolId) => {
    try {
        const classData = await Class.update(
            { name, description, schoolId },
            { where: { id } }
        );
        return classData;
    } catch (err) {
        console.log('Error updating class:', err);
        return null;
    }
};
const deleteClass = async (id) => {
    try {
        const classData = await Class.destroy({ where: { id } });
        return classData;
    } catch (er) {
        console.log('Error deleting class:', er);
        return null;
    }
};
export default {
    createClass,
    getAllClassesBySchoolId,
    getClassById,
    updateClass,
    deleteClass,
};